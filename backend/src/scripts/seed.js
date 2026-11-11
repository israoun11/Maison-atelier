const env = require('../config/env');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Service = require('../models/Service');
const slugify = require('../utils/slugify');
const { projects, services } = require('./seedData');

async function seed() {
  const { name, email, password } = env.admin;
  if (!env.mongoUri) throw new Error('MONGODB_URI is missing in .env');
  if (!email || !password || password.length < 8) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (min 8 characters) in .env before seeding.');
  }

  await connectDB(env.mongoUri);

  // Admin: created once. An existing admin is never overwritten.
  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`[seed] Admin ${email} already exists, left unchanged.`);
  } else {
    await Admin.create({ name: name || 'Studio Admin', email, password });
    console.log(`[seed] Admin created: ${email}`);
  }

  // Projects and services are upserted, so re-running never creates duplicates.
  for (const p of [...projects].reverse()) {
    await Project.findOneAndUpdate(
      { slug: slugify(p.title) },
      { $set: { ...p, slug: slugify(p.title) } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`[seed] ${projects.length} projects upserted.`);

  for (const sv of services) {
    await Service.findOneAndUpdate({ title: sv.title }, { $set: sv }, { upsert: true, new: true });
  }
  console.log(`[seed] ${services.length} services upserted.`);
}

seed()
  .then(() => mongoose.disconnect())
  .catch(async (err) => {
    console.error(`[seed] Failed: ${err.message}`);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
