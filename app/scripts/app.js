(function(){
	'use strict';
	angular.module('cag',['ui.router','ngAnimate'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('landing',{
					url:'/',
					templateUrl:'views/landing.html',
					controller: 'LandingCtrl'
				});

			$urlRouterProvider.otherwise('/');
		});



	angular.module('cag')
		.controller('LandingCtrl',function($scope,$timeout){
			$scope.showSideStuff = false;
			$scope.showLogin=false;
			$scope.init=false;

			$timeout(function(){
				$scope.init=true;
				$scope.showSideStuff=true;
			},300);

			$scope.login = function(){
				$scope.showLogin=true;
				$scope.showSideStuff=false;
				setTimeout(function(){
					$('input[type=email]').focus();
				},1400);
			};
			$scope.$on('hideLogin',function(){
				$scope.showLogin=false;
				$scope.showSideStuff=true;
			});

			$scope.quote = {
				type:'arrival'
			};
		});
})();