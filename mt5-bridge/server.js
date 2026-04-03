/**
 * SwaganX MT5 Bridge Server
 * ==========================
 * HTTP → MT5 Manager API translator
 * Runs on Windows VPS alongside MT5 Server
 * 
 * Architecture:
 *   CRM (Next.js/Vercel) --HTTP--> Bridge (Express/Windows) --FFI--> MT5 Manager API (C++ DLL)
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { MT5Manager } = require('./mt5-manager');
const { authenticate, authorize } = require('./middleware/auth');
const { validateRequest } = require('./middleware/validation');
const { rateLimit } = require('./middleware/rate-limit');
const { setupWebSocket } = require('./websocket');
const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 8443;

// ─── Middleware ────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));
app.use(rateLimit);

// Health check (no auth required)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mt5Connected: MT5Manager.isConnected(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ─── All routes require authentication ─────────────────────────────────
app.use(authenticate);

// ═══════════════════════════════════════════════════════════════════════
// MT5 ACCOUNTS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Create a new MT5 trading account
 * POST /api/accounts/create
 * Body: { name, email, group, leverage, currency, password }
 */
app.post('/api/accounts/create',
  validateRequest('createAccount'),
  async (req, res) => {
    try {
      const account = await MT5Manager.createAccount(req.body);
      logger.info(`Account created: ${account.login} for ${req.body.email}`);
      res.json({ success: true, data: account });
    } catch (err) {
      logger.error(`Account creation failed: ${err.message}`);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * Get account details by login
 * GET /api/accounts/:login
 */
app.get('/api/accounts/:login', async (req, res) => {
  try {
    const account = await MT5Manager.getAccount(req.params.login);
    if (!account) return res.status(404).json({ success: false, error: 'Account not found' });
    res.json({ success: true, data: account });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Get account balance
 * GET /api/accounts/:login/balance
 */
app.get('/api/accounts/:login/balance', async (req, res) => {
  try {
    const balance = await MT5Manager.getBalance(req.params.login);
    res.json({ success: true, data: { login: req.params.login, ...balance } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Update account leverage
 * PATCH /api/accounts/:login/leverage
 * Body: { leverage }
 */
app.patch('/api/accounts/:login/leverage',
  validateRequest('updateLeverage'),
  async (req, res) => {
    try {
      const result = await MT5Manager.updateLeverage(req.params.login, req.body.leverage);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * Get all accounts for a user (by email or group)
 * GET /api/accounts?email=x&group=x&status=x&page=1&limit=50
 */
app.get('/api/accounts', async (req, res) => {
  try {
    const { email, group, status, page = 1, limit = 50 } = req.query;
    const accounts = await MT5Manager.getAccounts({ email, group, status, page, limit });
    res.json({ success: true, data: accounts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════
// MT5 TRADES
// ═══════════════════════════════════════════════════════════════════════

/**
 * Get open positions for an account
 * GET /api/accounts/:login/positions
 */
app.get('/api/accounts/:login/positions', async (req, res) => {
  try {
    const positions = await MT5Manager.getPositions(req.params.login);
    res.json({ success: true, data: positions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Get trade history
 * GET /api/accounts/:login/history?from=timestamp&to=timestamp
 */
app.get('/api/accounts/:login/history', async (req, res) => {
  try {
    const { from, to } = req.query;
    const history = await MT5Manager.getTradeHistory(req.params.login, from, to);
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Get total volume traded (for IB commission)
 * GET /api/accounts/:login/volume?from=timestamp&to=timestamp
 */
app.get('/api/accounts/:login/volume', async (req, res) => {
  try {
    const { from, to } = req.query;
    const volume = await MT5Manager.getTotalVolume(req.params.login, from, to);
    res.json({ success: true, data: { login: req.params.login, ...volume } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Place a trade order
 * POST /api/trades/order
 * Body: { login, symbol, type, volume, price, sl, tp, comment }
 */
app.post('/api/trades/order',
  validateRequest('placeOrder'),
  async (req, res) => {
    try {
      const order = await MT5Manager.placeOrder(req.body);
      res.json({ success: true, data: order });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * Close a position
 * POST /api/trades/close
 * Body: { login, ticket, volume, price, comment }
 */
app.post('/api/trades/close',
  validateRequest('closeOrder'),
  async (req, res) => {
    try {
      const result = await MT5Manager.closePosition(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// ═══════════════════════════════════════════════════════════════════════
// MT5 GROUPS & SYMBOLS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Get all MT5 groups
 * GET /api/groups
 */
app.get('/api/groups', async (req, res) => {
  try {
    const groups = await MT5Manager.getGroups();
    res.json({ success: true, data: groups });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Create a new MT5 group
 * POST /api/groups/create
 * Body: { name, leverage, currency, ... }
 */
app.post('/api/groups/create',
  validateRequest('createGroup'),
  async (req, res) => {
    try {
      const group = await MT5Manager.createGroup(req.body);
      res.json({ success: true, data: group });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * Get all symbols
 * GET /api/symbols
 */
app.get('/api/symbols', async (req, res) => {
  try {
    const symbols = await MT5Manager.getSymbols();
    res.json({ success: true, data: symbols });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * Get symbol details (spread, digits, etc.)
 * GET /api/symbols/:symbol
 */
app.get('/api/symbols/:symbol', async (req, res) => {
  try {
    const symbol = await MT5Manager.getSymbolDetails(req.params.symbol);
    if (!symbol) return res.status(404).json({ success: false, error: 'Symbol not found' });
    res.json({ success: true, data: symbol });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════
# DEPOSITS & WITHDRAWALS (Balance Operations)
# ═══════════════════════════════════════════════════════════════════════

/**
 * Process deposit to MT5 account
 * POST /api/balance/deposit
 * Body: { login, amount, comment, ticket }
 */
app.post('/api/balance/deposit',
  validateRequest('balanceOperation'),
  async (req, res) => {
    try {
      const result = await MT5Manager.balanceDeposit(req.body);
      logger.info(`Deposit: ${req.body.amount} to ${req.body.login}`);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * Process withdrawal from MT5 account
 * POST /api/balance/withdraw
 * Body: { login, amount, comment, ticket }
 */
app.post('/api/balance/withdraw',
  validateRequest('balanceOperation'),
  async (req, res) => {
    try {
      const result = await MT5Manager.balanceWithdraw(req.body);
      logger.info(`Withdrawal: ${req.body.amount} from ${req.body.login}`);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// ═══════════════════════════════════════════════════════════════════════
// MT5 USERS (Client Registration in MT5)
# ═══════════════════════════════════════════════════════════════════════

/**
 * Register a client in MT5
 * POST /api/users/register
 * Body: { name, email, phone, group, leverage, currency, password }
 */
app.post('/api/users/register',
  validateRequest('createAccount'),
  async (req, res) => {
    try {
      const user = await MT5Manager.registerClient(req.body);
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * Get MT5 user details
 * GET /api/users/:login
 */
app.get('/api/users/:login', async (req, res) => {
  try {
    const user = await MT5Manager.getUser(req.params.login);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════════
// SERVER INFO
# ═══════════════════════════════════════════════════════════════════════

/**
 * Get MT5 server info
 * GET /api/server/info
 */
app.get('/api/server/info', async (req, res) => {
  try {
    const info = await MT5Manager.getServerInfo();
    res.json({ success: true, data: info });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─── Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// ─── Start Server ─────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  logger.info(`🚀 SwaganX MT5 Bridge running on port ${PORT}`);
  logger.info(`📡 MT5 Server: ${process.env.MT5_SERVER_ADDRESS}`);
  
  // Initialize MT5 Manager connection
  MT5Manager.connect({
    server: process.env.MT5_SERVER_ADDRESS,
    login: parseInt(process.env.MT5_MANAGER_LOGIN),
    password: process.env.MT5_MANAGER_PASSWORD,
    dataPath: process.env.MT5_DATA_PATH,
    dllPath: process.env.MT5_DLL_PATH,
  }).then(() => {
    logger.info('✅ MT5 Manager API connected');
  }).catch(err => {
    logger.error(`❌ MT5 Manager connection failed: ${err.message}`);
    logger.warn('Bridge running in DEMO mode — returns mock data');
  });
});

// WebSocket for real-time prices
setupWebSocket(server);

module.exports = app;
