(function(){
	'use strict';
	angular.module('cag').directive('passengerDropdown',function($state){
			return {
				template:[
				'<div class="passenger-dropdown">',
					'<div ng-click="showDropdown=true">',
						'<span ng-hide="selected"><span ng-if="index>1">add passenger {{index}} info</span><span ng-if="index==1">add lead passenger</span></span>',
						'<span ng-show="selected">{{selected.name}}</span>',
						'<ng-include src="\'images/pointer.svg\'"></ng-include>',
					'</div>',
					'<div class="dropdown" ng-show="showDropdown">',
						'<ul>',
							'<li ng-click="add()">+ new passenger</li>',
							'<li ng-repeat="contact in existing">',
							'<div ng-click="select(contact)">',
							'{{contact.name}}',
							'</div>',
							'<div class="edit" ui-sref=".edit({id:contact.id})"><ng-include src="\'images/edit.svg\'"></ng-include>edit</div>',
							'</li>',
						'</ul>',
					'</div>',
				'</div>'
				].join(''),
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