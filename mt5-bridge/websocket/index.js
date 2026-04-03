/**
 * WebSocket Server for Real-Time Price Feeds
 * Pushes bid/ask updates to connected CRM clients
 */

const WebSocket = require('ws');
const { MT5Manager } = require('../mt5-manager');
const { logger } = require('../utils/logger');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server, path: '/ws/prices' });

  wss.on('connection', (ws) => {
    logger.info('WebSocket client connected');
    
    // Send initial symbol list
    ws.send(JSON.stringify({ type: 'connected', message: 'SwaganX MT5 Bridge WebSocket' }));

    // Start price feed interval for this client
    const priceInterval = setInterval(async () => {
      try {
        const symbols = await MT5Manager.getSymbols();
        // Simulate small price movements
        const updates = symbols.map(s => ({
          symbol: s.symbol,
          bid: s.bid + (Math.random() - 0.5) * s.spread * 0.1,
          ask: s.ask + (Math.random() - 0.5) * s.spread * 0.1,
          spread: s.spread,
          timestamp: Date.now()
        }));
        ws.send(JSON.stringify({ type: 'prices', data: updates }));
      } catch (err) {
        // Silent fail for demo
      }
    }, 1000); // Update every second

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data);
        logger.info(`WS message: ${msg.type}`);
        
        if (msg.type === 'subscribe') {
          ws.send(JSON.stringify({ type: 'subscribed', symbols: msg.symbols }));
        }
        if (msg.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong' }));
        }
      } catch (err) {
        logger.error(`WS parse error: ${err.message}`);
      }
    });

    ws.on('close', () => {
      logger.info('WebSocket client disconnected');
      clearInterval(priceInterval);
    });

    ws.on('error', (err) => {
      logger.error(`WebSocket error: ${err.message}`);
    });
  });

  // Heartbeat for all clients
  const PING_INTERVAL = parseInt(process.env.WS_PING_INTERVAL) || 30000;
  setInterval(() => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.ping();
      }
    });
  }, PING_INTERVAL);

  logger.info('WebSocket server initialized on /ws/prices');
}

module.exports = { setupWebSocket };
