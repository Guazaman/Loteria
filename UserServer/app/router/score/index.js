var express = require('express');
var controller = require('./controller');
//manejador de endpoints
var router = express.Router();

router.get('/', controller.getScores); //makes the relation
router.post('/:id', controller.postScore); //increments score
//router.delete('/:id', controller.deleteScore);

router.get('/:id/Friends', controller.getByFriends); //needs sorting on front-end
router.get('/:country/Country', controller.getByCountry);
router.get('/Global', controller.getGlobal);

module.exports = router;