var express = require('express');
var controller = require('./controller');
//manejador de endpoints
var router = express.Router();

router.post('/', controller.postUser);
router.get('/', controller.getUsers);
router.delete('/:id', controller.deleteUser);

router.post('/Login', controller.login);
/*
router.get('/:id/Profile', controller.getProfile); //stores relation id 
router.put('/:id/Profile', controller.updateProfile);
router.delete('/:id/Profile', controller.deleteProfile);*/

router.post('/:user_id/Friends/:id', controller.postFriend); //post player id -> save as 
/*router.get('/:id/Friends', controller.getFriends); //return array {name: id:}
router.delete('/:id/Friends', controller.deleteFriend);*/

module.exports = router;