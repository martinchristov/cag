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
			$scope.bookings = {
				past:[
					{
						from:'LHR',
						to:'LAX',
						date:'',
						passengers:[],
						services:[],
						total:412
					},
					{
						from:'LAX',
						to:'LHR',
						date:'',
						passengers:[],
						services:[],
						total:217
					}
				],
				upcoming:[
					{
						from:'LAX',
						to:'LHR',
						date:'',
						passengers:[],
						services:[],
						total:325
					}
				]
			};
			$scope.abc='abcdefghijklmnopqrstuvwxyz'.split('');
			$scope.passengers = [
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
			$scope.$watch('currentState.name',function(){
				console.log($scope.currentState.name);
				$state.go($scope.currentState.name);
			});
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