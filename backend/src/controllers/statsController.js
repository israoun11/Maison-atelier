const Project = require('../models/Project');
const Service = require('../models/Service');
const Contact = require('../models/Contact');
const asyncHandler = require('../utils/asyncHandler');

exports.stats = asyncHandler(async (req, res) => {
  const [projects, services, messages, newMessages] = await Promise.all([
    Project.countDocuments(),
    Service.countDocuments(),
    Contact.countDocuments(),
    Contact.countDocuments({ status: 'new' }),
  ]);
  res.json({ success: true, data: { projects, services, messages, newMessages } });
});
