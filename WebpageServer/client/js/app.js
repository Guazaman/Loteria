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

    loteriaGame.directive('checklistModel', ['$parse', '$compile', function($parse, $compile) {
      // contains
      function contains(arr, item, comparator) {
        if (angular.isArray(arr)) {
          for (var i = arr.length; i--;) {
            if (comparator(arr[i], item)) {
              return true;
            }
          }
        }
        return false;
      }

      // add
      function add(arr, item, comparator) {
        arr = angular.isArray(arr) ? arr : [];
          if(!contains(arr, item, comparator)) {
              arr.push(item);
          }
        return arr;
      }

      // remove
      function remove(arr, item, comparator) {
        if (angular.isArray(arr)) {
          for (var i = arr.length; i--;) {
            if (comparator(arr[i], item)) {
              arr.splice(i, 1);
              break;
            }
          }
        }
        return arr;
      }

      // http://stackoverflow.com/a/19228302/1458162
      function postLinkFn(scope, elem, attrs) {
         // exclude recursion, but still keep the model
        var checklistModel = attrs.checklistModel;
        attrs.$set("checklistModel", null);
        // compile with `ng-model` pointing to `checked`
        $compile(elem)(scope);
        attrs.$set("checklistModel", checklistModel);

        // getter / setter for original model
        var getter = $parse(checklistModel);
        var setter = getter.assign;
        var checklistChange = $parse(attrs.checklistChange);
        var checklistBeforeChange = $parse(attrs.checklistBeforeChange);

        // value added to list
        var value = attrs.checklistValue ? $parse(attrs.checklistValue)(scope.$parent) : attrs.value;


        var comparator = angular.equals;

        if (attrs.hasOwnProperty('checklistComparator')){
          if (attrs.checklistComparator[0] == '.') {
            var comparatorExpression = attrs.checklistComparator.substring(1);
            comparator = function (a, b) {
              return a[comparatorExpression] === b[comparatorExpression];
            };

          } else {
            comparator = $parse(attrs.checklistComparator)(scope.$parent);
          }
        }

        // watch UI checked change
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }

          if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
            scope[attrs.ngModel] = contains(getter(scope.$parent), value, comparator);
            return;
          }

          setValueInChecklistModel(value, newValue);

          if (checklistChange) {
            checklistChange(scope);
          }
        });

        function setValueInChecklistModel(value, checked) {
          var current = getter(scope.$parent);
          if (angular.isFunction(setter)) {
            if (checked === true) {
              setter(scope.$parent, add(current, value, comparator));
            } else {
              setter(scope.$parent, remove(current, value, comparator));
            }
          }

        }

        // declare one function to be used for both $watch functions
        function setChecked(newArr, oldArr) {
          if (checklistBeforeChange && (checklistBeforeChange(scope) === false)) {
            setValueInChecklistModel(value, scope[attrs.ngModel]);
            return;
          }
          scope[attrs.ngModel] = contains(newArr, value, comparator);
        }

        // watch original model change
        // use the faster $watchCollection method if it's available
        if (angular.isFunction(scope.$parent.$watchCollection)) {
            scope.$parent.$watchCollection(checklistModel, setChecked);
        } else {
            scope.$parent.$watch(checklistModel, setChecked, true);
        }
      }

      return {
        restrict: 'A',
        priority: 1000,
        terminal: true,
        scope: true,
        compile: function(tElement, tAttrs) {
          if ((tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') && (tElement[0].tagName !== 'MD-CHECKBOX') && (!tAttrs.btnCheckbox)) {
            throw 'checklist-model should be applied to `input[type="checkbox"]` or `md-checkbox`.';
          }

          if (!tAttrs.checklistValue && !tAttrs.value) {
            throw 'You should provide `value` or `checklist-value`.';
          }

          // by default ngModel is 'checked', so we set it if not specified
          if (!tAttrs.ngModel) {
            // local scope var storing individual checkbox model
            tAttrs.$set("ngModel", "checked");
          }

          return postLinkFn;
        }
      };
    }]);

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
        when('/logout',{
          templateUrl: 'views/logout.html',
          controller: "LogoutController"
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
        otherwise('/  ', {
            templateUrl: 'views/inicio.html'
        });
        $locationProvider.html5Mode(true);
    }]);
})();
