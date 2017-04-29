/**
 * Created by Raptor on 13/06/16.
 */
(function() {

    let equipo6 = angular.module('equipo6', [
        'ngRoute',
        'equipo6Controllers',
        'ngSanitize',
        'ui.materialize'
    ]);

    equipo6.value('header', {
        brand: 'todos',
        model: 'todos',
        type: 'todos'
    });

    equipo6.value('comparar', {
        items: [0, 0, 0],
        numero: 0
    });

    equipo6.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.
        when('/', {
            templateUrl: 'views/inicio.html',
            controller: 'InicioController'
        }).
        otherwise('/', {
            templateUrl: 'views/inicio.html'
        });
        $locationProvider.html5Mode(true);
    }]);
})();
