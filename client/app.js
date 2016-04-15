(function() {
  'use strict';

    angular
      .module('authApp', ['ui.router', 'auth0', 'angular-storage', 'angular-jwt', 'ngMaterial'])
      .config(function($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {

        // Initialize Auth0 configuration
        authProvider.init({
          domain: 'YOUR_AUTH0_DOMAIN',
          clientID: 'YOUR_AUTH0_CLIENT_ID'
        });

        // Routing configuration
        $urlRouterProvider.otherwise('/home');

        $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'client/home/home.template.html',
            controller: 'homeController as home'
          })
          .state('profile', {
            url: '/profile',
            templateUrl: 'client/profile/profile.template.html',
            controller: 'profileController as user'
          });

        // JWT interceptor will take care of sending the JWT in every request.
        // It will get saved token from localStorage with angular-storage
        // If localStorage contains the token, it will be sent in the request
        jwtInterceptorProvider.tokenGetter = function(store) {
          return store.get('token');
        };

        // Handle with invalid/unauthenticated requests
        function redirect($q, auth, store, $location) {
          return {
            responseError: function(rejection) {
              if (rejection.status === 401) {
                auth.signout();
                store.remove('profile');
                store.remove('token');
                $location.path('/home');
              }
              return $q.reject(rejection);
            }
          }
        }
        $provide.factory('redirect', redirect);

        // Put services into HTTP interceptors
        $httpProvider.interceptors.push('jwtInterceptor');
        $httpProvider.interceptors.push('redirect');
      })
      .run(function($rootScope, $state, auth, store, jwtHelper, $location) {

        // Gets evaluated every time the page is refreshed, or when a new URL is reached
        $rootScope.$on('$locationChangeStart', function() {
          var token = store.get('token');

          if (token) {
            // Reauthenticates the user by using a stored profile and token without going through the login flow (with auth0-angular)
            // If there is token in localStorage but it is expired then when making request, the app will return 401 error code and the above redirect interceptor will handle this.
            if (!jwtHelper.isTokenExpired(token) && !auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          } else {
            // Do not store token in localStorage
            $location.path('/home');
          }
        });
      });

})();