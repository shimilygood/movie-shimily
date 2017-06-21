
(function (angular) {
	'use strict';

	var module = angular.module('myApp.details', ['ngRoute','myApp.services.http']);

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/details/:id', {
			templateUrl: 'tpl/view_details.html',
			controller: 'detailsCtrl'
		});
	}]);

	module.controller('detailsCtrl', [
		'$routeParams'
		,'$route'
		,'$scope'
		,'HttpService'
		,'Appconfig'   //依赖注入app.js里定义的公共模块
		,function($routeParams,$route,$scope,HttpService,Appconfig) {
			$scope.loading = true;
			$scope.movie = {};
			var id = $routeParams.id;
			var apiAdress = Appconfig.detailApiAddress+id;

			//跨域
			HttpService.jsonp(
				apiAdress, { },
				function(data) {
					$scope.movie = data;

					$scope.loading=false;
					$scope.$apply();

					// $apply的作用就是让指定的表达式重新同步
				});

	}]);

})(angular);



