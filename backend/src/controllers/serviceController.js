const Service = require('../models/Service');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const data = await Service.find().sort({ createdAt: 1, _id: 1 });
  res.json({ success: true, count: data.length, data });
});

exports.getById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  return res.json({ success: true, data: service });
});

exports.create = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

exports.update = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  return res.json({ success: true, data: service });
});

exports.remove = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
  return res.json({ success: true, message: 'Service deleted' });
});
