module.exports = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';

  console.error(`[ERROR] ${status}: ${message}`);

  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
