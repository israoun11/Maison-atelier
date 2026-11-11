const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const env = require('../config/env');
const asyncHandler = require('../utils/asyncHandler');

const publicAdmin = (a) => ({ id: a._id, name: a.name, email: a.email });

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
  const ok = admin ? await admin.comparePassword(password) : false;
  if (!ok) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: admin._id }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  return res.json({ success: true, token, admin: publicAdmin(admin) });
});

exports.me = (req, res) => res.json({ success: true, data: publicAdmin(req.admin) });
