const jwt = require("jsonwebtoken");
require("dotenv").config()

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Please Login!' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);
    if (decoded) {
      req.body.userID = decoded.userId
      req.body.role = decoded.role
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};
module.exports = {
  auth,
};

