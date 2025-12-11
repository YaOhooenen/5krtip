// middleware/logger.js
let requestCount = 0;

module.exports = (req, res, next) => {
  requestCount++;
  const now = new Date().toISOString();
  console.log(`[${now}] #${requestCount} ${req.method} ${req.originalUrl} (IP: ${req.ip})`);
  // можно добавлять: метрики, отправка в ELK и т.д.
  next();
};
