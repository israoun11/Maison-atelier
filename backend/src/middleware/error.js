const notFound = (req, res) =>
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Malformed JSON body' });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: 'A record with this value already exists' });
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ success: false, message: err.message });
  }
  console.error(err);
  return res.status(500).json({ success: false, message: 'Internal server error' });
};

module.exports = { notFound, errorHandler };
