// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])
.run(function($rootScope,$ionicPlatform,$cordovaSQLite,DB,Projects) {
      $rootScope.hostname = '192.168.1.33';
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    DB.init();

    //populate some projects
    Projects.all().then(function(projects){
      if(!projects.length){
        Projects.add({title:"Project 1"})
        Projects.add({title:"Project 2"})
        Projects.add({title:"Project 3"})
      }
    })


  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.projects', {
      url: '/projects',
      views: {
        'tab-projects': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ProjectsCtrl'
        }
      }
    })
    .state('tab.project-detail', {
      url: '/project/:projectId',
      views: {
        'tab-projects': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ProjectDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.constant('DB_CONFIG',{
      name:'DB',
      tables:[
        {
          name:'Tasks',
          columns:[
            {name:'id',type:'text primary key'},
            {name:'title',type:'text'},
            {name:'done',type:'integer'},
            {name:'project_id',type:'integer'},
            {name:'flag',type:'integer'},
            {name:'_v',type:'text'},
          ]
        },{
          name:'Projects',
          columns:[
            {name:'id',type:'integer primary key'},
            {name:'title',type:'text'},
          ]
        }
      ]
    })