(function(){
	'use strict';
	angular.module('cag').directive('progressBar',function(ProgressBar, $state){
		return {
			templateUrl:'partials/progress-bar.html',
			replace:true,
			restrict:'E',
			link: function($scope,el){
				var $bar = el.find('.bar');
				$scope.svc = ProgressBar;
				$scope.state = $state.current;
				$scope.$on('$stateChangeSuccess',function(){
					$scope.state = $state.current;
				});
				var states = ['details','passengers','services','payment'];
				$scope.back = function(){
					var state = $state.current.name.substr(8);
					for(var i=0;i<states.length;i++){
						if(states[i]==state){
							$state.go('booking.'+states[i-1]);
							break;
						}
					}
				};
			}
		}
	});
})();