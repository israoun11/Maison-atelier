const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const env = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/error');

const app = express();

app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || env.clientUrls.includes(origin)) {
        return cb(null, true);
      }

      try {
        const requestOrigin = new URL(origin);
        const allowedHost = process.env.RENDER_EXTERNAL_HOSTNAME;

        if (allowedHost && requestOrigin.host === allowedHost) {
          return cb(null, true);
        }
      } catch (error) {
        // Invalid origin
      }

      return cb(new Error('Not allowed by CORS'));
    },
  })
);

app.use(express.json({ limit: '1mb' }));

// API routes
app.use('/api/v1', routes);
app.use('/api/v1', notFound);

// Frontend production build
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
const indexPath = path.join(frontendDist, 'index.html');

if (fs.existsSync(indexPath)) {
  app.use(express.static(frontendDist));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(indexPath);
  });
}

// Final 404 and error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;