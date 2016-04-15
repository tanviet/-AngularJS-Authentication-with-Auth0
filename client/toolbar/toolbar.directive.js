(function() {
  'use strict';

  angular
    .module('authApp')
    .directive('toolbar', toolbar);

    function toolbar() {
      return {
        templateUrl: 'client/toolbar/toolbar.template.html',
        controller: toolbarController,
        controllerAs: 'toolbar'
      }
    }

    function toolbarController(auth, store, $location) {
      var vm = this;
      vm.login = login;
      vm.logout = logout;
      vm.auth = auth;

      /**
       * Help user login with Auth0
       * @return {void} The auth service has a signin method that makes use of Auth0Lock.
       *                If authentication is successful, the user's profile and token are saved in local storage with the store service.
       */
      function login() {
        auth.signin({}, function(profile, token) {
          store.set('profile', profile);
          store.set('token', token);
          $location.path('/home');
        }, function(err) {
          console.log('Login failed', err);
        });
      }

      /**
       * Logout out the app
       * @return {void} The signout method on the auth service sets isAuthenticated to false
       *                but we also need to remove the profile and token from local storage
       */
      function logout() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        $location.path('/home');
      }
    }

})();