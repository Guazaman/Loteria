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
            templateUrl: 'views/landingPage.html',
            controller: 'InicioController'
        }).
        when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileController',
          css:'css/profile.css'
        }).
        when('/gamerooms',{
          templateUrl: 'views/gamerooms.html',
          controller: "GameRoomsController",
          css:'css/gamerooms.css'
        }).
        when('/login',{
          templateUrl: 'views/login.html',
          controller: "LoginController"
        }).
        when('/register',{
          templateUrl: 'views/register.html',
          controller: "RegisterController"
        }).
        when('/waiting',{
          templateUrl: 'views/waiting.html',
          controller: "WaitingController"
        }).
        otherwise('/  ', {
            templateUrl: 'views/inicio.html'
        });
        $locationProvider.html5Mode(true);
    }]);
})();
