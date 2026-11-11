const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const env = require('../config/env');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
  const admin = await Admin.findById(payload.id);
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Account no longer exists' });
  }
  req.admin = admin;
  return next();
});

module.exports = { protect };
