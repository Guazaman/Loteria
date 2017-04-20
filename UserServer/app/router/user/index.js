var express = require('express');
var controller = require('./controller');
//manejador de endpoints
var router = express.Router();

router.post('/', controller.postUser);
router.get('/', controller.getUser);
router.delete('/', controller.deleteUser);

module.exports = router;