// LOAD Schemas from their documents.
var Card = require('./../../models/card')
var GameRoom = require('./../../models/gameroom')

// API
// Make the routes can be used by other documents = exporting them
module.exports = function(app){

    // GET Gamerooms - ALL
    app.get('/gamerooms', function(req, res) {

        // Moongose used, var Gameroom.find();
        GameRoom.find(function(err, gamerooms) {

            // Error, show and send the error.
            if (err){
                console.log(err);
                return res.send(err);
            }

            // Else (no error) return all
            res.status(200);
            res.json(gamerooms);
        });
    });

    // CREATE Hospital, get hospitals after
    app.post('/gamerooms', function(req, res) {

        // Create GameRoom, information comes from AJAX request from Angular
        GameRoom.create({
        	ownerId: req.body.ownerId, 	
			name: req.body.name, 
			type: req.body.type, 	
			players: req.body.players, 
			createdAt: req.body.createdAt, 
			winner: req.body.winner, 
			maxPlayers: req.body.maxPlayers
        }, function(err, gameroom) {
            if (err){
                console.log(err);
                //res.status(401);
                return res.send(err);
            }

                

            // Get all GameRooms
            GameRoom.find(function(err, gamerooms) {
                if (err)
                    return res.send(err);
                res.json(gamerooms);
            });
        });

    });

    // DELETE Gameroom
    app.delete('/gamerooms/:gameroom_id', function(req, res) {
        GameRoom.remove({
            _id : req.params.gameroom_id
        }, function(err, gameroom) {
            if (err)
                return res.send(err);

            // Get all 
            GameRoom.find(function(err, gamerooms) {
                if (err)
                    return res.send(err);
                res.json(gamerooms);
            });
        });
    });

    // GET Cards
    app.get('/cards', function(req, res) {

        // Moongose used, var Medic.find();
        Card.find(function(err, cards) {

            // Error, show and send the error.
            if (err){
            	console.log(err);
                return res.send(err);
            }

            // Else (no error) return all cards
            res.status(200);
            res.json(cards);
        });
    });

    // CREATE Medic, get medics after
    app.post('/cards', function(req, res) {

        // Create MEdic, information comes from AJAX request from Angular
        Card.create({
            cardName: req.body.cardName
        }, function(err, card) {
            if (err)
                return res.send(err);

            Card.find(function(err, cards) {
                if (err)
                    return res.send(err);
                res.json(cards);
            });
        });

    });

    // DELETE Medic
    app.delete('/cards/:card_id', function(req, res) {
        Card.remove({
            _id : req.params.card_id
        }, function(err, card) {
            if (err)
                return res.send(err);

            // Get all Medics and Return them
            Card.find(function(err, cards) {
                if (err)
                    return res.send(err);
                res.json(cards);
            });
        });
    });


};