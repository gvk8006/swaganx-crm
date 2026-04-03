/**
 * SwaganX MT5 Bridge Client
 * ==========================
 * Client library for the CRM to communicate with the MT5 Bridge
 * Runs on the CRM side (Next.js API routes or client-side)
 */

const BRIDGE_URL = process.env.MT5_BRIDGE_URL || 'http://your-vps-ip:8443';
const BRIDGE_API_KEY = process.env.BRIDGE_API_KEY || 'swaganx-bridge-key';

class MT5BridgeClient {
  constructor(bridgeUrl = BRIDGE_URL, apiKey = BRIDGE_API_KEY) {
    this.baseUrl = bridgeUrl;
    this.apiKey = apiKey;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (!data.success && response.status >= 400) {
        throw new Error(data.error || `Bridge error: ${response.status}`);
      }
      return data;
    } catch (err) {
      throw new Error(`Bridge request failed: ${err.message}`);
    }
  }

  // ─── Health ──────────────────────────────────────────────────────
  async health() {
    return this.request('/health');
  }

  // ─── Accounts ─────────────────────────────────────────────────────
  async createAccount(data) {
    return this.request('/api/accounts/create', { method: 'POST', body: data });
  }

  async getAccount(login) {
    return this.request(`/api/accounts/${login}`);
  }

  async getAccounts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/accounts?${query}`);
  }

  async getBalance(login) {
    return this.request(`/api/accounts/${login}/balance`);
  }

  async updateLeverage(login, leverage) {
    return this.request(`/api/accounts/${login}/leverage`, { method: 'PATCH', body: { leverage } });
  }

  // ─── Positions & History ──────────────────────────────────────────
  async getPositions(login) {
    return this.request(`/api/accounts/${login}/positions`);
  }

  async getTradeHistory(login, from, to) {
    const params = {};
    if (from) params.from = from;
    if (to) params.to = to;
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/accounts/${login}/history?${query}`);
  }

  async getTotalVolume(login, from, to) {
    const params = {};
    if (from) params.from = from;
    if (to) params.to = to;
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/accounts/${login}/volume?${query}`);
  }

  // ─── Orders ──────────────────────────────────────────────────────
  async placeOrder(data) {
    return this.request('/api/trades/order', { method: 'POST', body: data });
  }

  async closePosition(data) {
    return this.request('/api/trades/close', { method: 'POST', body: data });
  }

  // ─── Balance Operations ───────────────────────────────────────────
  async deposit(data) {
    return this.request('/api/balance/deposit', { method: 'POST', body: data });
  }

  async withdraw(data) {
    return this.request('/api/balance/withdraw', { method: 'POST', body: data });
  }

  // ─── Groups & Symbols ─────────────────────────────────────────────
  async getGroups() {
    return this.request('/api/groups');
  }

  async createGroup(data) {
    return this.request('/api/groups/create', { method: 'POST', body: data });
  }

  async getSymbols() {
    return this.request('/api/symbols');
  }

  async getSymbol(symbol) {
    return this.request(`/api/symbols/${symbol}`);
  }

  // ─── Users ───────────────────────────────────────────────────────
  async registerUser(data) {
    return this.request('/api/users/register', { method: 'POST', body: data });
  }

  async getUser(login) {
    return this.request(`/api/users/${login}`);
  }

  // ─── Server ──────────────────────────────────────────────────────
  async getServerInfo() {
    return this.request('/api/server/info');
  }
}

// Singleton instance
const mt5 = new MT5BridgeClient();

module.exports = { MT5BridgeClient, mt5 };
