(function(){
	'use strict';
	angular.module('cag')
		.controller('BookingCtrl',function($scope,$state){
			if($state.current.name=='booking'){
				$state.go('booking.details');
			}
		});
})();