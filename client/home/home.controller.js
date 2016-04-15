(function() {
  'use strict';

  angular
    .module('authApp')
    .controller('homeController', homeController);

    function homeController(auth) {
      var vm = this;
      vm.auth = auth;
    }
})();