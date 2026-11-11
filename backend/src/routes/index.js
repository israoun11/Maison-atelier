const express = require('express');
const mongoose = require('mongoose');
const { protect } = require('../middleware/auth');
const { validate, validateObjectId } = require('../middleware/validate');
const rateLimit = require('../utils/rateLimit');
const s = require('../validators/schemas');
const auth = require('../controllers/authController');
const projects = require('../controllers/projectController');
const services = require('../controllers/serviceController');
const contacts = require('../controllers/contactController');
const stats = require('../controllers/statsController');

const router = express.Router();
router.param('id', validateObjectId);

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Too many login attempts. Try again later.' });
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 8, message: 'Too many messages. Try again later.' });

router.get('/health', (req, res) =>
  res.json({ success: true, status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
);

// Auth (no public registration route exists)
router.post('/auth/login', loginLimiter, validate(s.loginSchema), auth.login);
router.get('/auth/me', protect, auth.me);

// Admin dashboard stats
router.get('/admin/stats', protect, stats.stats);

// Projects
router.get('/projects', projects.list);
router.get('/projects/slug/:slug', projects.getBySlug);
router.get('/projects/:id', projects.getById);
router.post('/projects', protect, validate(s.projectSchema), projects.create);
router.put('/projects/:id', protect, validate(s.projectUpdateSchema), projects.update);
router.delete('/projects/:id', protect, projects.remove);

// Services
router.get('/services', services.list);
router.get('/services/:id', services.getById);
router.post('/services', protect, validate(s.serviceSchema), services.create);
router.put('/services/:id', protect, validate(s.serviceUpdateSchema), services.update);
router.delete('/services/:id', protect, services.remove);

// Contact
router.post('/contact', contactLimiter, validate(s.contactSchema), contacts.submit);
router.get('/contact', protect, contacts.list);
router.get('/contact/:id', protect, contacts.getById);
router.patch('/contact/:id/status', protect, validate(s.statusSchema), contacts.updateStatus);
router.delete('/contact/:id', protect, contacts.remove);

module.exports = router;
