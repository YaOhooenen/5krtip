
const express = require('express');
const router = express.Router();
const controller = require('../controllers/weatherController');
const requireApiKey = require('../middleware/requireApiKey');


router.get('/', controller.list);


router.get('/:id', controller.getById);


router.post('/', requireApiKey, controller.create);


router.put('/:id', requireApiKey, controller.update);


router.delete('/:id', requireApiKey, controller.remove);

module.exports = router;
