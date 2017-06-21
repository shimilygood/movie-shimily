(function (angular) {
		'use strict';

		var module = angular.module('myApp.view', ['ngRoute','myApp.services.http']);

		module.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/:list/:page', {
				templateUrl: 'tpl/view_list.html',
				controller: 'viewCtrl'
			});
		}]);

		module.controller('viewCtrl', [
			'$routeParams',
			'$route','$scope',
			'HttpService',

			'Appconfig',    //依赖注入app.js里定义的公共模块
			function($routeParams,$route,$scope,HttpService,Appconfig) {

				//console.log(Appconfig.listApiAddresa);

				$scope.subjects=[];
				$scope.totalCount =0;
				$scope.loading = true;
				$scope. submenu=$routeParams.list
				var list = $routeParams.list;
				//console.log($routeParams.list);
				switch (list){
					case 'in_theaters':
						$scope.subtitle = '正在热映';
						break;
					case 'coming_soon':
						$scope.subtitle = '即将上映';
						break;
					case 'top250':
						$scope.subtitle = 'Top';
						break;
				}


				var count = 10;
				var page = parseInt($routeParams.page);
				var start = (page-1)*count;
				//console.log(start);

				$scope.currentPage = page;


				//跨域
				HttpService.jsonp(
					Appconfig.listApiAddresa+$routeParams.list, { start: start, count:count },
					function(data) {
						$scope.subjects = data.subjects;
						$scope.totalCount = data.total;
						$scope.totalPages = Math.ceil($scope.totalCount/count);
						

						$scope.loading=false;

						pages($scope.totalPages,5);


						$scope.$apply();

						// $apply的作用就是让指定的表达式重新同步
					});

				//分页
				$scope.goPage = function (page) {
					if(page>=1&&page<=$scope.totalPages){
						$route.updateParams({page:page});

					}

				}


				//分页处理====================
				var pages=function (totalPages,show) {
					var curpage = parseInt($routeParams.page);
					//console.log($contain);
					$scope.current =curpage;
					$scope.total = totalPages;
					$scope.show = show;
					//当前页左右各几个
					$scope.region = Math.floor($scope.show /2);

					$scope.begin = $scope.current-$scope.region;
					$scope.begin=$scope.begin<1?1:$scope.begin;
					$scope.end= $scope.begin + $scope.show;
					if($scope.end > $scope.total){
						$scope.end = $scope.total +1;
						$scope.begin = $scope.end - $scope.show;
						$scope.begin = $scope.begin<1?1:$scope.begin;
					}

					var $contain =document.getElementById('pages');

					//上一页
					var prevli = document.createElement('li');
					prevli.innerHTML = '<a href="#/'+$routeParams.list+'/'+($scope.current-1)+'" aria-label="Previous">'+
						'<span aria-hidden="true">&laquo;上一页</span>'+
						'</a>';
					if ($scope.current == 1) {
						prevli.classList.add('disabled');
					}
					$contain.appendChild(prevli);

					//中间部分
					for(var i = $scope.begin; i<$scope.end; i++){

						var li = document.createElement('li');
						li.innerHTML = '<a href="#/'+$routeParams.list+'/'+i+'">'+i+'</a>';

						if(i==$scope.current){
							li.classList.add('active');
						}

						$contain.appendChild(li);

					}

					//下一页
					var nextli = document.createElement('li');
					nextli.innerHTML = '<a href="#/'+$routeParams.list+'/'+($scope.current+1)+'" aria-label="Previous">'+
						'<span aria-hidden="true">下一页&raquo;</span>'+
						'</a>';
					if ($scope.current == $scope.total) {
						nextli.classList.add('disabled');
					}
					$contain.appendChild(nextli);

				}
			}]);
})(angular);
