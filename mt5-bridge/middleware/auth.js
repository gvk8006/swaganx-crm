/**
 * Authentication Middleware
 * Validates API key from CRM requests
 */
const API_KEY = process.env.BRIDGE_API_KEY || 'swaganx-bridge-key';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Missing authorization header' });
  }

  const [scheme, key] = authHeader.split(' ');
  
  if (scheme !== 'Bearer' || key !== API_KEY) {
    return res.status(403).json({ success: false, error: 'Invalid API key' });
  }

  next();
}

function authorize(roles = []) {
  return (req, res, next) => {
    // Role-based access can be added here
    // e.g., only admin can access /api/groups/create
    next();
  };
}

module.exports = { authenticate, authorize };
