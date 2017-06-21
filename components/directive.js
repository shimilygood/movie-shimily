angular.module('myApp.directive.auto-fause', [])

	.directive('autoFause', ['$location', function($location) {
		var path =$location.path();
		return {
			restrict:'A',
			link: function (scope, ielm) {
				var aLink = ielm.children().attr('href');
				//var type = aLink.replace(/#(\/.+?)\/\d+/,'$1');
				var type = aLink.replace(/#(\/.+?)/,'$1');

				if(path.startsWith(type)){

					ielm.addClass('active');
				}



				ielm.on('click',function () {

					ielm.parent().children().removeClass('active');
					ielm.addClass('active')
					//window.ielm=ielm;
				});
			}
		}
	}]);

