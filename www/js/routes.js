angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/loginTemplate.html',
    controller: 'loginCtrl'
  })

  .state('avaliaO30min', {
    url: '/avaliacoes',
    templateUrl: 'templates/avaliaO30min.html',
    controller: 'avaliaO30minCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});