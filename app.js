const express = require('express');
const path = require('path');
const morgan = require('morgan');

const weatherRouter = require('./routes/weather');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP access log (morgan) + наш собственный логгер
app.use(morgan('dev'));
app.use(logger);

// Раздача статических файлов (виджет + фронтенд)
app.use(express.static(path.join(__dirname, 'public')));

// API маршруты
app.use('/api/weather', weatherRouter);

// Базовый маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404-обработка
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
