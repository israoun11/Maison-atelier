const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true, trim: true },
    gallery: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
    year: { type: String, trim: true },
    area: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
