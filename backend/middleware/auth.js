const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  const auth = req.header('Authorization');
  if (!auth) return res.status(401).json({ message: 'No token' });

  const token = auth.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};
