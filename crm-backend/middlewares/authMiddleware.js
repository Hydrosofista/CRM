// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware do weryfikacji tokenu JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Brak autoryzacji' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Nieprawidłowy token' });
  }
};

module.exports = authenticateToken;