'use strict';

/* App Module */

angular.module('medApp', ['ngRoute','ngResource','ngAnimate'])

.config(
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/brief.html',
      }).
      when('/academics', {
        templateUrl: 'partials/academics.html',

      }).
      when('/assets', {
        templateUrl: 'partials/assets.html',

      }).
      when('/projects', {
        templateUrl: 'partials/projects.html',
        controller: 'projectsCtrl',
        resolve: {
          result: function(projectsFactory) {return projectsFactory.query().$promise;}
        }
      }).
      when('/projects/:projectId', {
        templateUrl: 'partials/project.html',
        controller: 'projectCtrl'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  })


  /* Services */

.factory('projectsFactory',
    function($resource){
      return $resource('service.json', {}, {query: {method:'GET', isArray:true}});
    })


    /* Controllers */

.controller('projectsCtrl', function($scope,$filter, result) {
        $scope.projects=result;
        //$scope.projects = chunk(result, 4);
        console.log($scope.projects);


      })

.controller('projectCtrl', ['$scope','$routeParams','projectsFactory',
  function($scope, $routeParams, projectsFactory) {

    $scope.projects= projectsFactory.query();
    $scope.id = $routeParams.projectId;
    }])
    /* Modules */
