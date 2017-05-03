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

    loteriaGame.directive('head', ['$rootScope','$compile',
        function($rootScope, $compile){
            return {
                restrict: 'E',
                link: function(scope, elem){
                    var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                    elem.append($compile(html)(scope));
                    scope.routeStyles = {};
                    $rootScope.$on('$routeChangeStart', function (e, next, current) {
                        if(current && current.$$route && current.$$route.css){
                            if(!angular.isArray(current.$$route.css)){
                                current.$$route.css = [current.$$route.css];
                            }
                            angular.forEach(current.$$route.css, function(sheet){
                                delete scope.routeStyles[sheet];
                            });
                        }
                        if(next && next.$$route && next.$$route.css){
                            if(!angular.isArray(next.$$route.css)){
                                next.$$route.css = [next.$$route.css];
                            }
                            angular.forEach(next.$$route.css, function(sheet){
                                scope.routeStyles[sheet] = sheet;
                            });
                        }
                    });
                }
            };
        }
    ]);

    loteriaGame.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.
        when('/', {
            templateUrl: 'views/landingPage.html',
            controller: 'InicioController',
            css: 'css/lp_style.css'
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
          controller: "WaitingController",
          css: "css/waiting_style.css"
        }).
        when('/scores',{
          templateUrl: 'views/scores.html',
          controller: "ScoreController",
          css: "css/scores_style.css"
        }).
        otherwise('/  ', {
            templateUrl: 'views/inicio.html'
        });
        $locationProvider.html5Mode(true);
    }]);
})();
