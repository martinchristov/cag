(function(){
	'use strict';
	angular.module('cag').directive('passengerDropdown',function($state){
			return {
				templateUrl:'partials/passenger-dropdown.html',
				replace:true,
				restrict:'E',
				scope:{
					index:'@'
				},
				link: function($scope,el){
					$scope.existing = [
						{
							name:'Hannah Morby',
							id:1
						},
						{
							name:'Martin Christov',
							id:2
						},
						{
							name:'Iliyan Oprev',
							id:3
						}
					];
					$scope.add = function(){
						$scope.showDropdown=false;
						$state.go('.add');
					};
					$scope.select = function(contact){
						$scope.showDropdown=false;
						$scope.selected=contact;
						$scope.$emit('selectedpassenger');
					};
				}
			}
		})
})();