/**
 * Request Validation Middleware
 */
const validators = {
  createAccount: (req, res, next) => {
    const { name, email, group, leverage, currency, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Name and email are required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
    }
    next();
  },
  updateLeverage: (req, res, next) => {
    const { leverage } = req.body;
    const validLeverages = [1, 2, 10, 25, 50, 100, 200, 500, 1000, 2000];
    if (!validLeverages.includes(parseInt(leverage))) {
      return res.status(400).json({ success: false, error: 'Invalid leverage value' });
    }
    next();
  },
  placeOrder: (req, res, next) => {
    const { login, symbol, type, volume } = req.body;
    if (!login || !symbol || !type || !volume) {
      return res.status(400).json({ success: false, error: 'login, symbol, type, and volume are required' });
    }
    if (!['Buy', 'Sell'].includes(type)) {
      return res.status(400).json({ success: false, error: 'Type must be Buy or Sell' });
    }
    if (parseFloat(volume) <= 0) {
      return res.status(400).json({ success: false, error: 'Volume must be positive' });
    }
    next();
  },
  closeOrder: (req, res, next) => {
    const { login, ticket } = req.body;
    if (!login || !ticket) {
      return res.status(400).json({ success: false, error: 'login and ticket are required' });
    }
    next();
  },
  balanceOperation: (req, res, next) => {
    const { login, amount } = req.body;
    if (!login || !amount) {
      return res.status(400).json({ success: false, error: 'login and amount are required' });
    }
    if (parseFloat(amount) <= 0) {
      return res.status(400).json({ success: false, error: 'Amount must be positive' });
    }
    next();
  },
  createGroup: (req, res, next) => {
    const { name, leverage, currency } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, error: 'Group name is required' });
    }
    next();
  }
};

function validateRequest(validatorName) {
  const validator = validators[validatorName];
  if (!validator) {
    console.warn(`Unknown validator: ${validatorName}`);
    return (req, res, next) => next();
  }
  return validator;
}

module.exports = { validateRequest };
