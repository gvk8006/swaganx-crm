/**
 * MT5 Manager API Wrapper
 * ========================
 * Interfaces with MetaTrader 5 Manager API via FFI
 * 
 * In production: Uses ffi-napi / koffi to call the native C++ DLL
 * In demo mode: Returns realistic mock data for development
 * 
 * MT5 Manager API Key Functions:
 * - MT5ManagerCreate() → Initialize connection
 * - MT5ManagerConnect(address, login, password) → Connect to server
 * - MT5ManagerAccountCreate(...) → Create trading account
 * - MT5ManagerAccountGet(login) → Get account details
 * - MT5ManagerPositionsGet(login) → Get open positions
 * - MT5ManagerHistoryGet(login, from, to) → Get trade history
 * - MT5ManagerDealAdd(...) → Process balance operations (deposit/withdraw)
 * - MT5ManagerOrderSend(...) → Place market orders
 * - MT5ManagerOrderClose(...) → Close positions
 * - MT5ManagerGroupCreate(...) → Create account groups
 * - MT5ManagerSymbolsGet() → Get available symbols
 */

const { v4: uuidv4 } = require('uuid');

// ─── State ─────────────────────────────────────────────────────────────
let connected = false;
let config = {};
let mockAccounts = {};
let mockTrades = [];
let mockPositions = [];

// Initialize mock data for development
function initMockData() {
  // Mock trading accounts
  mockAccounts = {
    '77730631': {
      login: 77730631, name: 'Real Plus', group: 'swaganx\\real\\plus',
      currency: 'USD', balance: 1068308.736, equity: 1085432.10,
      margin: 45230.00, freeMargin: 1040202.10, leverage: 100,
      profit: 17123.364, credit: 0, status: 'Active',
      created: '2026-02-02T00:00:00Z'
    },
    '68175002': {
      login: 68175002, name: 'Real Pro', group: 'swaganx\\real\\pro',
      currency: 'USD', balance: 2000.00, equity: 2145.80,
      margin: 320.00, freeMargin: 1825.80, leverage: 500,
      profit: 145.80, credit: 0, status: 'Active',
      created: '2026-02-15T00:00:00Z'
    },
    '88123456': {
      login: 88123456, name: 'Demo Standard', group: 'swaganx\\demo',
      currency: 'USD', balance: 50000.00, equity: 52340.00,
      margin: 5000.00, freeMargin: 47340.00, leverage: 100,
      profit: 2340.00, credit: 0, status: 'Active',
      created: '2026-03-01T00:00:00Z'
    }
  };

  // Mock positions
  mockPositions = [
    { ticket: 12345678, login: 77730631, symbol: 'EURUSD', type: 'Buy', volume: 0.5, openPrice: 1.0845, currentPrice: 1.0912, sl: 1.0800, tp: 1.0950, profit: 335.00, swap: 2.30, commission: -3.50, time: '2026-04-02T14:30:00Z' },
    { ticket: 12345679, login: 77730631, symbol: 'GBPUSD', type: 'Sell', volume: 0.3, openPrice: 1.2634, currentPrice: 1.2601, sl: 1.2700, tp: 1.2550, profit: 99.00, swap: -1.20, commission: -2.10, time: '2026-04-02T12:15:00Z' },
    { ticket: 12345680, login: 68175002, symbol: 'USDJPY', type: 'Buy', volume: 0.1, openPrice: 151.23, currentPrice: 151.56, sl: 150.80, tp: 152.00, profit: 33.00, swap: 0.80, commission: -0.70, time: '2026-04-02T10:45:00Z' },
  ];

  // Mock trade history
  mockTrades = [
    { ticket: 100001, login: 77730631, symbol: 'EURUSD', type: 'Buy', volume: 0.5, openPrice: 1.0845, closePrice: 1.0912, profit: 335.00, commission: -3.50, swap: 2.30, openTime: '2026-04-02T14:30:00Z', closeTime: '2026-04-02T16:45:00Z' },
    { ticket: 100002, login: 77730631, symbol: 'GBPUSD', type: 'Sell', volume: 0.3, openPrice: 1.2634, closePrice: 1.2658, profit: 72.00, commission: -2.10, swap: -0.45, openTime: '2026-04-02T12:15:00Z', closeTime: '2026-04-02T14:20:00Z' },
    { ticket: 100003, login: 77730631, symbol: 'USDJPY', type: 'Buy', volume: 1.0, openPrice: 151.23, closePrice: 150.85, profit: -380.00, commission: -7.00, swap: 1.20, openTime: '2026-04-02T10:45:00Z', closeTime: '2026-04-02T11:30:00Z' },
    { ticket: 100004, login: 77730631, symbol: 'AUDUSD', type: 'Sell', volume: 0.2, openPrice: 0.6543, closePrice: 0.6565, profit: 44.00, commission: -1.40, swap: 0.00, openTime: '2026-04-01T16:20:00Z', closeTime: '2026-04-01T18:50:00Z' },
    { ticket: 100005, login: 77730631, symbol: 'EURGBP', type: 'Buy', volume: 0.8, openPrice: 0.8567, closePrice: 0.8612, profit: 360.00, commission: -5.60, swap: -1.80, openTime: '2026-04-01T09:30:00Z', closeTime: '2026-04-01T12:15:00Z' },
    { ticket: 100006, login: 77730631, symbol: 'USDCHF', type: 'Sell', volume: 0.4, openPrice: 0.8923, closePrice: 0.8898, profit: 100.00, commission: -2.80, swap: 0.55, openTime: '2026-03-31T14:00:00Z', closeTime: '2026-03-31T17:30:00Z' },
    { ticket: 100007, login: 77730631, symbol: 'NZDUSD', type: 'Buy', volume: 0.15, openPrice: 0.6123, closePrice: 0.6098, profit: -37.50, commission: -1.05, swap: 0.00, openTime: '2026-03-31T10:20:00Z', closeTime: '2026-03-31T11:45:00Z' },
    { ticket: 100008, login: 77730631, symbol: 'EURUSD', type: 'Sell', volume: 0.6, openPrice: 1.0876, closePrice: 1.0854, profit: 132.00, commission: -4.20, swap: -0.30, openTime: '2026-03-30T15:45:00Z', closeTime: '2026-03-30T18:20:00Z' },
  ];
}

initMockData();

// ═══════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════

const MT5Manager = {
  isConnected: () => connected,

  async connect(cfg) {
    config = cfg;
    // In production: Initialize FFI and call MT5ManagerCreate + MT5ManagerConnect
    // For now: simulate connection with mock data
    connected = true;
    return true;
  },

  async disconnect() {
    connected = false;
    return true;
  },

  // ─── Account Management ────────────────────────────────────────────

  async createAccount({ name, email, group, leverage, currency, password }) {
    if (connected && !config.dllPath) {
      // DEMO MODE
      const login = String(Math.floor(10000000 + Math.random() * 90000000));
      const account = {
        login,
        name: name || email,
        group: group || 'swaganx\\real\\standard',
        currency: currency || 'USD',
        balance: 0,
        equity: 0,
        margin: 0,
        freeMargin: 0,
        leverage: parseInt(leverage) || 100,
        profit: 0,
        credit: 0,
        status: 'Active',
        created: new Date().toISOString()
      };
      mockAccounts[login] = account;
      return account;
    }
    // PRODUCTION: Call MT5ManagerAccountCreate via FFI
    // const result = ffi.MT5ManagerAccountCreate(group, name, password, leverage, currency, ...);
    throw new Error('MT5 DLL not configured');
  },

  async getAccount(login) {
    if (connected && !config.dllPath) {
      return mockAccounts[String(login)] || null;
    }
    throw new Error('MT5 DLL not configured');
  },

  async getAccounts({ email, group, status, page = 1, limit = 50 }) {
    if (connected && !config.dllPath) {
      let accounts = Object.values(mockAccounts);
      if (group) accounts = accounts.filter(a => a.group.includes(group));
      if (status) accounts = accounts.filter(a => a.status === status);
      const start = (page - 1) * limit;
      return {
        accounts: accounts.slice(start, start + limit),
        total: accounts.length,
        page: parseInt(page),
        limit: parseInt(limit)
      };
    }
    throw new Error('MT5 DLL not configured');
  },

  async getBalance(login) {
    const account = await this.getAccount(login);
    if (!account) throw new Error('Account not found');
    return { balance: account.balance, equity: account.equity, margin: account.margin, freeMargin: account.freeMargin, profit: account.profit };
  },

  async updateLeverage(login, leverage) {
    const account = await this.getAccount(login);
    if (!account) throw new Error('Account not found');
    account.leverage = parseInt(leverage);
    return { login, leverage: account.leverage };
  },

  // ─── Positions & History ───────────────────────────────────────────

  async getPositions(login) {
    if (connected && !config.dllPath) {
      return mockPositions.filter(p => String(p.login) === String(login));
    }
    throw new Error('MT5 DLL not configured');
  },

  async getTradeHistory(login, from, to) {
    if (connected && !config.dllPath) {
      let trades = mockTrades.filter(t => String(t.login) === String(login));
      if (from) trades = trades.filter(t => new Date(t.closeTime) >= new Date(parseInt(from)));
      if (to) trades = trades.filter(t => new Date(t.closeTime) <= new Date(parseInt(to)));
      return trades;
    }
    throw new Error('MT5 DLL not configured');
  },

  async getTotalVolume(login, from, to) {
    const history = await this.getTradeHistory(login, from, to);
    const totalLots = history.reduce((sum, t) => sum + t.volume, 0);
    return { totalLots, tradeCount: history.length };
  },

  // ─── Order Operations ──────────────────────────────────────────────

  async placeOrder({ login, symbol, type, volume, price, sl, tp, comment }) {
    if (connected && !config.dllPath) {
      const ticket = Math.floor(Math.random() * 99999999) + 10000000;
      const position = {
        ticket, login: parseInt(login), symbol, type,
        volume: parseFloat(volume), openPrice: parseFloat(price) || 1.0845,
        currentPrice: parseFloat(price) || 1.0845, sl, tp,
        profit: 0, swap: 0, commission: -(parseFloat(volume) * 7),
        time: new Date().toISOString(), comment: comment || ''
      };
      mockPositions.push(position);
      return position;
    }
    throw new Error('MT5 DLL not configured');
  },

  async closePosition({ login, ticket, volume, price, comment }) {
    if (connected && !config.dllPath) {
      const idx = mockPositions.findIndex(p => p.ticket === parseInt(ticket) && String(p.login) === String(login));
      if (idx === -1) throw new Error('Position not found');
      const pos = mockPositions.splice(idx, 1)[0];
      const profit = pos.type === 'Buy' 
        ? (parseFloat(price) - pos.openPrice) * pos.volume * 100000
        : (pos.openPrice - parseFloat(price)) * pos.volume * 100000;
      const closedTrade = { ...pos, closePrice: parseFloat(price), profit: Math.round(profit * 100) / 100, closeTime: new Date().toISOString(), comment: comment || '' };
      mockTrades.push(closedTrade);
      return closedTrade;
    }
    throw new Error('MT5 DLL not configured');
  },

  // ─── Balance Operations ───────────────────────────────────────────

  async balanceDeposit({ login, amount, comment, ticket }) {
    const account = await this.getAccount(login);
    if (!account) throw new Error('Account not found');
    account.balance += parseFloat(amount);
    account.equity += parseFloat(amount);
    return { login: parseInt(login), amount: parseFloat(amount), newBalance: account.balance, ticket: ticket || uuidv4(), comment };
  },

  async balanceWithdraw({ login, amount, comment, ticket }) {
    const account = await this.getAccount(login);
    if (!account) throw new Error('Account not found');
    if (account.balance < parseFloat(amount)) throw new Error('Insufficient balance');
    account.balance -= parseFloat(amount);
    account.equity -= parseFloat(amount);
    return { login: parseInt(login), amount: parseFloat(amount), newBalance: account.balance, ticket: ticket || uuidv4(), comment };
  },

  // ─── Groups & Symbols ─────────────────────────────────────────────

  async getGroups() {
    if (connected && !config.dllPath) {
      return [
        { name: 'swaganx\\real\\standard', leverage: 100, currency: 'USD', accounts: 234, description: 'Standard real account' },
        { name: 'swaganx\\real\\plus', leverage: 100, currency: 'USD', accounts: 156, description: 'Plus real account' },
        { name: 'swaganx\\real\\pro', leverage: 500, currency: 'USD', accounts: 89, description: 'Pro real account' },
        { name: 'swaganx\\real\\ecn', leverage: 200, currency: 'USD', accounts: 45, description: 'ECN real account' },
        { name: 'swaganx\\demo', leverage: 100, currency: 'USD', accounts: 567, description: 'Demo account' },
        { name: 'swaganx\\contest', leverage: 100, currency: 'USD', accounts: 0, description: 'Contest account' },
      ];
    }
    throw new Error('MT5 DLL not configured');
  },

  async createGroup({ name, leverage, currency }) {
    if (connected && !config.dllPath) {
      const group = { name: `swaganx\\${name}`, leverage: parseInt(leverage) || 100, currency: currency || 'USD', accounts: 0, description: name };
      return group;
    }
    throw new Error('MT5 DLL not configured');
  },

  async getSymbols() {
    if (connected && !config.dllPath) {
      return [
        { symbol: 'EURUSD', bid: 1.0845, ask: 1.0847, spread: 2, digits: 5, lotSize: 100000 },
        { symbol: 'GBPUSD', bid: 1.2634, ask: 1.2637, spread: 3, digits: 5, lotSize: 100000 },
        { symbol: 'USDJPY', bid: 151.23, ask: 151.25, spread: 2, digits: 3, lotSize: 100000 },
        { symbol: 'USDCHF', bid: 0.8923, ask: 0.8925, spread: 2, digits: 5, lotSize: 100000 },
        { symbol: 'AUDUSD', bid: 0.6543, ask: 0.6545, spread: 2, digits: 5, lotSize: 100000 },
        { symbol: 'USDCAD', bid: 1.3654, ask: 1.3657, spread: 3, digits: 5, lotSize: 100000 },
        { symbol: 'NZDUSD', bid: 0.6123, ask: 0.6125, spread: 2, digits: 5, lotSize: 100000 },
        { symbol: 'EURGBP', bid: 0.8567, ask: 0.8570, spread: 3, digits: 5, lotSize: 100000 },
        { symbol: 'XAUUSD', bid: 2345.60, ask: 2346.10, spread: 50, digits: 2, lotSize: 100 },
        { symbol: 'BTCUSD', bid: 67500.00, ask: 67550.00, spread: 500, digits: 2, lotSize: 1 },
      ];
    }
    throw new Error('MT5 DLL not configured');
  },

  async getSymbolDetails(symbol) {
    const symbols = await this.getSymbols();
    return symbols.find(s => s.symbol === symbol) || null;
  },

  // ─── User Management ──────────────────────────────────────────────

  async registerClient({ name, email, phone, group, leverage, currency, password }) {
    return this.createAccount({ name, email, group, leverage, currency, password });
  },

  async getUser(login) {
    return this.getAccount(login);
  },

  // ─── Server Info ──────────────────────────────────────────────────

  async getServerInfo() {
    return {
      name: 'SwaganX-MT5',
      company: 'SwaganX Technologies',
      version: '5.0.4567',
      build: '4567',
      platform: 'MT5',
      timezone: 'UTC+2',
      totalAccounts: Object.keys(mockAccounts).length,
      totalPositions: mockPositions.length,
      connected: true
    };
  }
};

module.exports = { MT5Manager };
