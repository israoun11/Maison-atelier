const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');
const slugify = require('../utils/slugify');

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function uniqueSlug(base, excludeId) {
  const root = base || 'project';
  let slug = root;
  let i = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await Project.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    i += 1;
    slug = `${root}-${i}`;
  }
  return slug;
}

exports.list = asyncHandler(async (req, res) => {
  const filter = {};
  if (typeof req.query.category === 'string' && req.query.category.trim()) {
    filter.category = new RegExp(`^${escapeRegex(req.query.category.trim())}$`, 'i');
  }
  if (req.query.featured === 'true') filter.featured = true;
  const data = await Project.find(filter).sort({ featured: -1, createdAt: -1, _id: -1 });
  res.json({ success: true, count: data.length, data });
});

exports.getById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  return res.json({ success: true, data: project });
});

exports.getBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug.toLowerCase() });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  return res.json({ success: true, data: project });
});

exports.create = asyncHandler(async (req, res) => {
  const body = req.body;
  const slug = await uniqueSlug(slugify(body.slug || body.title));
  const project = await Project.create({ ...body, slug });
  res.status(201).json({ success: true, data: project });
});

exports.update = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  const body = { ...req.body };
  if (body.slug) body.slug = await uniqueSlug(slugify(body.slug), project._id);
  Object.assign(project, body);
  await project.save();
  return res.json({ success: true, data: project });
});

exports.remove = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  return res.json({ success: true, message: 'Project deleted' });
});
