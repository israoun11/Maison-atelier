const { z } = require('zod');

const url = z.string().trim().url('Must be a valid URL');

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, 'Password is required'),
});

const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().min(1).max(80).optional(),
  category: z.string().trim().min(2).max(60),
  location: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(3000),
  coverImage: url,
  gallery: z.array(url).max(12).default([]),
  featured: z.boolean().default(false),
  year: z.string().trim().max(10).optional(),
  area: z.string().trim().max(40).optional(),
});
const projectUpdateSchema = projectSchema.partial();

const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().min(10).max(2000),
  image: url,
});
const serviceUpdateSchema = serviceSchema.partial();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(5000),
});

const statusSchema = z.object({
  status: z.enum(['new', 'read', 'archived']),
});

module.exports = {
  loginSchema,
  projectSchema,
  projectUpdateSchema,
  serviceSchema,
  serviceUpdateSchema,
  contactSchema,
  statusSchema,
};
