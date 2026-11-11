const Contact = require('../models/Contact');
const asyncHandler = require('../utils/asyncHandler');

exports.submit = asyncHandler(async (req, res) => {
  await Contact.create(req.body);
  res.status(201).json({ success: true, message: 'Thank you. Your message has been received.' });
});

exports.list = asyncHandler(async (req, res) => {
  const filter = {};
  if (['new', 'read', 'archived'].includes(req.query.status)) filter.status = req.query.status;
  const data = await Contact.find(filter).sort({ createdAt: -1, _id: -1 });
  res.json({ success: true, count: data.length, data });
});

exports.getById = asyncHandler(async (req, res) => {
  const msg = await Contact.findById(req.params.id);
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
  return res.json({ success: true, data: msg });
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const msg = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
  return res.json({ success: true, data: msg });
});

exports.remove = asyncHandler(async (req, res) => {
  const msg = await Contact.findByIdAndDelete(req.params.id);
  if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
  return res.json({ success: true, message: 'Message deleted' });
});
