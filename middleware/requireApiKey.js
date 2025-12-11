
module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key') || req.query.apiKey;
 
  if (!apiKey || apiKey !== process.env.WIDGET_API_KEY && apiKey !== 'secret-student-key') {
    return res.status(401).json({ error: 'Unauthorized. Provide valid x-api-key header or ?apiKey=.' });
  }
  next();
};
