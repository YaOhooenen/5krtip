// controllers/weatherController.js
const { v4: uuidv4 } = require('uuid');

// In-memory store (для учебного проекта)
const forecasts = [
  {
    id: uuidv4(),
    city: 'Moscow',
    temp: 3,
    condition: 'Cloudy',
    timestamp: new Date().toISOString()
  },
  {
    id: uuidv4(),
    city: 'Berlin',
    temp: 6,
    condition: 'Sunny',
    timestamp: new Date().toISOString()
  }
];

// GET /api/weather  — список с фильтрацией через req.query
exports.list = (req, res) => {
  let result = forecasts.slice();

  // Примеры query-параметров: city, minTemp, maxTemp, limit
  const { city, minTemp, maxTemp, limit } = req.query;

  if (city) {
    const c = city.toLowerCase();
    result = result.filter(f => f.city.toLowerCase().includes(c));
  }
  if (minTemp !== undefined) {
    const n = Number(minTemp);
    if (!Number.isNaN(n)) result = result.filter(f => f.temp >= n);
  }
  if (maxTemp !== undefined) {
    const n = Number(maxTemp);
    if (!Number.isNaN(n)) result = result.filter(f => f.temp <= n);
  }
  if (limit !== undefined) {
    const n = parseInt(limit, 10);
    if (!Number.isNaN(n)) result = result.slice(0, n);
  }

  res.json({ count: result.length, data: result });
};

// GET /api/weather/:id  — использование req.params
exports.getById = (req, res) => {
  const { id } = req.params;
  const item = forecasts.find(f => f.id === id);
  if (!item) return res.status(404).json({ error: 'Forecast not found' });
  res.json(item);
};

// POST /api/weather  — создание новой записи
exports.create = (req, res) => {
  const { city, temp, condition } = req.body;
  if (!city || temp === undefined) {
    return res.status(400).json({ error: 'Missing required fields: city, temp' });
  }
  const newItem = {
    id: uuidv4(),
    city,
    temp: Number(temp),
    condition: condition || 'Unknown',
    timestamp: new Date().toISOString()
  };
  forecasts.push(newItem);
  res.status(201).json(newItem);
};

// PUT /api/weather/:id  — обновление
exports.update = (req, res) => {
  const { id } = req.params;
  const { city, temp, condition } = req.body;
  const idx = forecasts.findIndex(f => f.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  if (city !== undefined) forecasts[idx].city = city;
  if (temp !== undefined) forecasts[idx].temp = Number(temp);
  if (condition !== undefined) forecasts[idx].condition = condition;
  forecasts[idx].timestamp = new Date().toISOString();

  res.json(forecasts[idx]);
};

// DELETE /api/weather/:id
exports.remove = (req, res) => {
  const { id } = req.params;
  const idx = forecasts.findIndex(f => f.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const removed = forecasts.splice(idx, 1)[0];
  res.json({ removed });
};
