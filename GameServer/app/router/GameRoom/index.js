
var express = require('express');
var controller = require('./controller');
//manejador de endpoints
var router = express.Router();

router.post('/', controller.postGameRoom);
router.get('/', controller.getGameRoom);
router.delete('/', controller.deleteGameRoom);

module.exports = router;
