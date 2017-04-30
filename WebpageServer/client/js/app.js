/**
 * Created by Raptor on 13/06/16.
 */
(function() {

    let loteriaGame = angular.module('loteriaGame', [
        'ngRoute',
        'loteriaGameControllers',
        'ngSanitize',
        'ui.materialize'
    ]);

    loteriaGame.value('header', {
        brand: 'todos',
        model: 'todos',
        type: 'todos'
    });

    loteriaGame.value('comparar', {
        items: [0, 0, 0],
        numero: 0
    });

    loteriaGame.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.
        when('/', {
            templateUrl: 'views/inicio.html',
            controller: 'InicioController'
        }).
        when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileController',
          css:'css/profile.css'
        }).
        otherwise('/  ', {
            templateUrl: 'views/inicio.html'
        });
        $locationProvider.html5Mode(true);
    }]);
})();
