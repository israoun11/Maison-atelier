const env = require('./config/env');
const connectDB = require('./config/db');

async function start() {
  const missing = ['MONGODB_URI', 'JWT_SECRET'].filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`Missing environment variables: ${missing.join(', ')}. Copy .env.example to .env first.`);
    process.exit(1);
  }
  if (env.jwtSecret.length < 16) {
    console.error('JWT_SECRET is too short. Use at least 16 random characters.');
    process.exit(1);
  }
  try {
    await connectDB(env.mongoUri);
  } catch (err) {
    console.error(`[db] Could not connect to MongoDB: ${err.message}`);
    console.error('Check MONGODB_URI, your Atlas IP allow-list and your username/password.');
    process.exit(1);
  }
  const app = require('./app');
  app.listen(env.port, () => console.log(`[api] http://localhost:${env.port}/api/v1`));
}

start();
