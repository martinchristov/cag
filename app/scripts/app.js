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
				//remove
				$(document).scrollTo(0);
			},300);


			//show side stuff & init sidebar after cover image has loaded
			var img = new Image();
			var a = $('#cover').css('background-image').substr(5);
			a = a.substr(0,a.length-2);
			img.src = a;
			img.onload = function(){
				$timeout(function(){
					$scope.init=true;
					$scope.showSideStuff=true;
				});
			}
			//endof

				

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

			// $scope.$watch('quote.date',function(newval,oldval){
			// 	if(newval!==oldval){
			// 		$scope.showQuoteDatePicker=false;
			// 		$scope.quote.dateD = $scope.quote.date.format('D');
			// 		$scope.quote.dateM = $scope.quote.date.format('M');
			// 		$scope.quote.dateY = $scope.quote.date.format('YY');
			// 	}
			// })
			$scope.$on('hidePicker',function(){
				$scope.showQuoteDatePicker=false;
				
				$timeout(function(){
					$('[date-picker]').removeClass('hidden');
					$scope.quote.dateD = $scope.quote.date.format('D');
					$scope.quote.dateM = $scope.quote.date.format('M');
					$scope.quote.dateY = $scope.quote.date.format('YY');
				});
			});
		});
})();