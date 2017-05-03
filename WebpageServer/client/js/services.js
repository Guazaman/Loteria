'use strict';
angular.module('loteriaGameControllers').factory('socket', function($rootScope){
	var socket = io.connect('http://b4ee01aa.ngrok.io/');
	console.log(socket);
	return {
		on: function(eventName, callback){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket,args);
				});
			})
		},
		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
			})
		}
	};
});

