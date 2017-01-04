(function(){
	'use strict';
	angular.module('cag')
		.controller('MyCtrl',function($scope,$state){
			$scope.currentState = $state.current;
			$scope.$watch(function(){
				return $state.current.name
			}, function(newVal, oldVal){
				$scope.currentState = $state.current;
			});
			$scope.abc='abcdefghijklmnopqrstuvwxyz'.split('');
			$scope.passangers = [
				{
					name:'man solo',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'ban solo 2',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 3',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 4',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 2',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 3',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 4',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 2',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 3',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 4',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 2',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 3',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				},
				{
					name:'han solo 4',
					birthdd:'12',
					birthmm:'03',
					birthyy:'99',
					nationality:'Galactic Republic',
					passport:'12312321',
					email:'han@jedi.com',
					mobile:'+359 123 123 123',
					notes:'something here'
				}
			];

			$scope.filterBy = '';
			$scope.filterLtr = function(ltr){
				if($scope.filterBy==ltr){
					$scope.filterBy = '';
				}
				else {
					$scope.filterBy = ltr;

				}
				
			};
		});
})();