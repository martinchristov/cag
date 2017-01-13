(function(){
	'use strict';
	angular.module('cag').controller('AddPassengerCtrl',function($scope){
		$scope.passenger = {
			title:''
		};
		$scope.$watch('passenger.title',function(){
			if($scope.passenger.title=='other'){
				setTimeout(function(){
					$('.passenger-other').focus();
				},200);
			}
		});
	});
})();