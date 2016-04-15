(function() {
  'use strict';

  angular
    .module('authApp')
    .controller('profileController', profileController);

    function profileController($http) {
      var vm = this;
      vm.message = null;
      vm.api = 'http://localhost:5000/api/';
      vm.getPublicMessage = getPublicMessage;
      vm.getPrivateMessage = getPrivateMessage;
      vm.profile = JSON.parse(localStorage.getItem('profile'));

      /**
       * Get message from public API
       * @return {String} Makes a call to a public API route that does not require authentication.
       *                  We can avoid sending the JWT as an Authorization header with skipAuthorization: true
       *                  Read more: https://github.com/auth0/angular-jwt#not-sending-the-jwt-for-specific-requests
       */
      function getPublicMessage() {
        $http.get(vm.api + 'public', {
          skipAuthorization: true
        }).then(function(res) {
          vm.message = res.data.message;
        });
      }

      /**
       * Get message from private API using JWT
       * @return {String} Makes a call to a private endpoint that does require authentication.
       *                  The JWT is automatically sent with HTTP calls using jwtInterceptorProvider in app.js
       */
      function getPrivateMessage() {
        $http.get(vm.api + 'private').then(function(res) {
          vm.message = res.data.message;
        });
      }
    }
})();