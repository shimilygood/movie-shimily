(function (angular) {
		'use strict';

		var module = angular.module('myApp.view', ['ngRoute','myApp.services.http']);

		module.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/:list/:page', {
				templateUrl: 'tpl/view_list.html',
				controller: 'viewCtrl'
			});
		}]);

		module.controller('viewCtrl', ['$routeParams','$route','$scope','HttpService',function($routeParams,$route,$scope,HttpService) {
			$scope.subjects=[];
			$scope.totalCount =0;
			$scope.loading = true;

			console.log($routeParams.list)
			var count = 5;
			var page = parseInt($routeParams.page);
			var start = (page-1)*count;
			//console.log(start);

			$scope.currentPage = page;


			//跨域
			HttpService.jsonp(
				'http://api.douban.com/v2/movie/'+$routeParams.list, { start: start, count:count },
				function(data) {
					$scope.subjects = data.subjects;
					$scope.totalCount = data.total;
					$scope.totalPages = Math.ceil($scope.totalCount/count);


					$scope.loading=false;
					$scope.$apply();

					// $apply的作用就是让指定的表达式重新同步
				});

			//分页
			$scope.goPage = function (page) {
				if(page>=1&&page<=$scope.totalPages){
					$route.updateParams({page:page});
				}

			}

		}]);

})(angular);
