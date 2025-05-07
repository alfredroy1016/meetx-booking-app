const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  
  const token = req.cookies.token || req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    req.user = decoded.userId;

    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
