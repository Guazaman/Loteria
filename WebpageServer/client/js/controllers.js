/**
 * Created by Raptor on 13/06/16.
 */
let loteriaGameControllers = angular.module('loteriaGameControllers', ['ngCookies']);

loteriaGameControllers.controller('InicioController', ['$scope',  'header', function($scope, header){

}]);

loteriaGameControllers.controller('ProfileController', ['$scope', '$http', '$rootScope', '$cookies', '$cookieStore', '$window', function ($scope, $http, $rootScope, $cookies, $cookieStore, $window){
  console.log("Id: "+ $cookieStore.get('id'));
  console.log("Name: "+ $cookieStore.get('name'));

}]);

loteriaGameControllers.controller('GameRoomsController', ['$scope',  'header', function($scope, header){

}]);

loteriaGameControllers.controller('LoginController', ['$scope', '$http', '$rootScope', '$cookies', '$cookieStore', '$window', function ($scope, $http, $rootScope, $cookies, $cookieStore, $window){
  $scope.loginController = function() {
    console.log("Consutando...");
    console.log("Email: "+ $scope.loginEmail);
    console.log("Password: "+ $scope.loginPassword);

    var req = {
      method: 'POST',
      url: 'http://138.197.219.168:8000/Users/Login/',
      data: { email: $scope.loginEmail,
      password: $scope.loginPassword
      }
    };

    $http(req).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log("Id" + response.data.name);
    console.log("Name:" +response.data.id);
    $cookieStore.put('id', response.data.id);
    $cookieStore.put('name', response.data.name);
    $window.location.href = '/profile'

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response);

  });
  }
}]);



loteriaGameControllers.controller('RegisterController',  ['$scope', '$http', '$rootScope', '$cookies', '$cookieStore', '$window', function ($scope, $http, $rootScope, $cookies, $cookieStore, $window){
  $scope.registerController = function() {
    console.log("Registrando...");
    console.log("Username: " + $scope.registerName);
    console.log("Email: " + $scope.registerEmail);
    console.log("Password: " + $scope.registerPassword);
    console.log("Favorite Board Game: " + $scope.registerFavoriteBoardGame);
    console.log("Country: " + $scope.registerCountry);
    console.log("id: "+ $cookieStore.get('id'));


    var req = {
      method: 'POST',
      url: 'http://138.197.219.168:8000/Users/',
      data: { name: $scope.registerName,
              email: $scope.registerEmail,
              password: $scope.registerPassword,
              favoriteBoardGame: $scope.registerFavoriteBoardGame,
              country: $scope.registerCountry
      }
    };

    $http(req).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response);
    console.log("Id" + response.data.name);
    console.log("Name:" +response.data.id);
    $cookieStore.put('id', response.data.id);
    $cookieStore.put('name', response.data.name);
    $window.location.href = '/profile'
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response);

  });
  }
}]);
