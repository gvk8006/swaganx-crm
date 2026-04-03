/**
 * MT5 Proxy API Route
 * ===================
 * Proxies requests from the CRM frontend to the MT5 Bridge running on Windows VPS.
 * Flow: Browser → /api/mt5/* → MT5 Bridge (Windows VPS) → MT5 Manager API
 */

const BRIDGE_URL = process.env.MT5_BRIDGE_URL || 'http://localhost:8443';
const BRIDGE_API_KEY = process.env.BRIDGE_API_KEY || 'swaganx-bridge-key';

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  const { method } = req;
  const path = req.url.replace(/^\/api\/mt5/, '');

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') return res.status(200).end();

  try {
    const bridgeUrl = `${BRIDGE_URL}/api${path}`;
    const fetchOptions = {
      method,
      headers: {
        'Authorization': `Bearer ${BRIDGE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    if (req.body && Object.keys(req.body).length > 0) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(bridgeUrl, fetchOptions);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('MT5 Bridge proxy error:', err.message);
    // Return mock data for demo/development when bridge is unreachable
    if (process.env.NODE_ENV === 'development') {
      return res.status(200).json({ success: true, demo: true, error: 'Bridge offline, showing demo data', message: err.message });
    }
    return res.status(502).json({ success: false, error: `Bridge unreachable: ${err.message}` });
  }
}
