// Tiny in-memory rate limiter (enough for a single-instance demo API).
function rateLimit({ windowMs, max, message }) {
  const hits = new Map();
  return (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next();
    const now = Date.now();
    const key = req.ip;
    const entry = hits.get(key);
    if (!entry || entry.reset < now) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return next();
    }
    entry.count += 1;
    if (entry.count > max) {
      return res.status(429).json({ success: false, message });
    }
    return next();
  };
}

module.exports = rateLimit;
