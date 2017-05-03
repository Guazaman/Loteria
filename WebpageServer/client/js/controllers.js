/**
* Created by Raptor on 13/06/16.
*/
let loteriaGameControllers = angular.module('loteriaGameControllers', ['ngCookies']);

loteriaGameControllers.controller('InicioController', [ '$scope', '$http', '$rootScope', '$cookies', '$cookieStore', '$window', function ($scope, $http, $rootScope, $cookies, $cookieStore, $window){
  console.log("Solicitando...");
  console.log("Id: "+ $cookieStore.get('id'));
  console.log("Name: "+ $cookieStore.get('name'));
}]);

loteriaGameControllers.controller('ProfileController', ['$scope', '$http', '$rootScope', '$cookies', '$cookieStore', '$window', function ($scope, $http, $rootScope, $cookies, $cookieStore, $window){
  console.log("Solicitando...");
  console.log("Id: "+ $cookieStore.get('id'));
  console.log("Name: "+ $cookieStore.get('name'));
  var req = {
    method: 'GET',
    url: 'http://138.197.219.168:8000/Users/' + $cookieStore.get('id') +'/Profile',
  };

   var loadFriends = function(){
    var loading = {
      method: 'GET',
      url: 'http://138.197.219.168:8000/Users/' + $cookieStore.get('id') +'/Friends',
    };
    $http(loading).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.friends = response.data;

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);

    });
  }

  $http(req).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.profileBoardGame = response.data.boardgame;
    $scope.profileCountry = response.data.country;
    $scope.profileEmail = response.data.email;
    $scope.profileName = response.data.name;
    $scope.profileScore = response.data.score;
    loadFriends();

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response);

  });
  $scope.logOfController = function() {
    $cookieStore.remove('id');
    $cookieStore.remove('name');
    $window.location.href = '/'
  }

  $scope.deleteAccountController = function() {
    var req = {
      method: 'DELETE',
      url: 'http://138.197.219.168:8000/Users/' + $cookieStore.get('id')
    };
    $http(req).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $window.location.href = '/'

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);

    });
  }

}]);

loteriaGameControllers.controller('GameRoomsController', ['$scope', '$http', '$rootScope', '$cookies', '$cookieStore', '$window', function ($scope, $http, $rootScope, $cookies, $cookieStore, $window){
  var req = {
    method: 'GET',
    url: 'https://5e8d0c8e.ngrok.io/gamerooms'
  };

  $scope.values = [2,3,4,5];

  var today = new Date();

  $scope.createNewGameController = function(){
    var newGameRoom = {
      method: 'POST',
      url: 'https://5e8d0c8e.ngrok.io/gamerooms',
      data: { ownerId: $cookieStore.get('id'),
              name: $scope.gameRoomName,
              createdAt: today,
              maxPlayers: $scope.gameRoomMaxPlayers ,
              status: 'Waiting',
              type: $scope.gameRoomType,
              players: [$cookieStore.get('name')]

      }
    };
    $http(newGameRoom).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(response);
    });
  };

  $http(req).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response);
    $scope.gameRooms = response.data;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log(response);
  },

  $scope.newGameRoomController = function() {

    $cookieStore.remove('id');
    $cookieStore.remove('name');
    $window.location.href = '/'
  }

);
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

loteriaGameControllers.controller('WaitingController', ['$scope',  'header', function($scope, header){

}]);

loteriaGameControllers.controller('HeaderController', ['$scope', 'header',  '$cookies', '$cookieStore', function($scope, header, $cookies, $cookieStore){
  $scope.logged = false;

  if($cookieStore.get('id')){
      $scope.logged = true;
      console.log("The user is logged");
  }else{
    console.log("The user is NOT logged");
  }

}]);
