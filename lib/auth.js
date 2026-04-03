const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'swaganx-crm-jwt-secret-change-in-production-2026';

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Middleware for API routes
function requireAuth(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
    const decoded = verifyToken(authHeader.split(' ')[1]);
    if (!decoded) {
      return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    return handler(req, res);
  };
}

function requireAdmin(handler) {
  return requireAuth(async (req, res) => {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    return handler(req, res);
  });
}

module.exports = { signToken, verifyToken, requireAuth, requireAdmin, JWT_SECRET };
