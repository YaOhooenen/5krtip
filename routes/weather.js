// routes/weather.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/weatherController');
const requireApiKey = require('../middleware/requireApiKey');

// GET список (использует req.query)
router.get('/', controller.list);

// GET по ID (использует req.params)
router.get('/:id', controller.getById);

// POST — создаём новую запись (требуем API-ключ)
router.post('/', requireApiKey, controller.create);

// PUT — обновление по ID (требуем API-ключ)
router.put('/:id', requireApiKey, controller.update);

// DELETE — удаление (требуем API-ключ)
router.delete('/:id', requireApiKey, controller.remove);

module.exports = router;
