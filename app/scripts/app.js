(function(){
	'use strict';
	angular.module('cag',['ui.router','ngAnimate','datePicker'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('landing',{
					url:'/landing',
					templateUrl:'views/landing.html',
					controller: 'LandingCtrl'
				});

			$urlRouterProvider.otherwise('/landing');
		});



	angular.module('cag')
		.controller('LandingCtrl',function($scope,$timeout){
			$scope.showSideStuff = false;
			$scope.showLogin=false;
			$scope.init=false;

			$timeout(function(){
				$scope.init=true;
				$scope.showSideStuff=true;
				//remove
				$(document).scrollTo(1600);
			},300);

			$('a.scrollto').click(function(e){
				e.preventDefault();
				$.scrollTo($($(this).attr('href')),600);
			})

			$scope.login = function(){
				$scope.showLogin=true;
				$scope.showSideStuff=false;
				setTimeout(function(){
					$('input[type=email]:first').focus();
				},1400);
			};
			$scope.$on('hideLogin',function(){
				$scope.showLogin=false;
				$scope.showSideStuff=true;
			});

			$scope.quote = {
				type:'arrival',
				date: null
			};

			$scope.$watch('quote.date',function(newval,oldval){
				if(newval!==oldval){
					$scope.showQuoteDatePicker=false;
					$scope.quote.dateD = $scope.quote.date.format('D');
					$scope.quote.dateM = $scope.quote.date.format('M');
					$scope.quote.dateY = $scope.quote.date.format('YY');
				}
			})
		});
})();