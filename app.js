const express = require('express');
const path = require('path');
const morgan = require('morgan');

const weatherRouter = require('./routes/weather');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(morgan('dev'));
app.use(logger);


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/weather', weatherRouter);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
