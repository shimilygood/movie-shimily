'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.details',
	'myApp.view',
	'myApp.directive.auto-fause',
	'myApp.version'
])

//微模块定义一些常量   -->子模块可以直接使用
.constant('Appconfig',{
	pageSize:10,
	listApiAddresa:'http://api.douban.com/v2/movie/',
	detailApiAddress:'http://api.douban.com/v2/movie/subject/'
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/coming_soon/1'});
}])

// -->子模块是不能使用的
.controller('navCtrl',['$scope','$location',function ($scope,$location) {
	$scope.type = false;
	$scope.$location = $location;
	//console.log($scope.$location);
	$scope.$watch('$location.path()',function (now) {
		if(now.startsWith('/in_theaters')){
			$scope.type='in_theaters';
		}else if(now.startsWith('/coming_soon')){
			$scope.type='coming_soon';
		}else if(now.startsWith('/top250')){
			$scope.type='top250';
		}
		//console.log($scope.type);
	});
}]);
