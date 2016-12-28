(function(){
	'use strict';
	angular.module('cag')
		.controller('MyCtrl',function($scope,$state){
			$scope.currentState = $state.current;
			$scope.$watch(function(){
				return $state.current.name
			}, function(newVal, oldVal){
				$scope.currentState = $state.current;
			}) 
		});
})();