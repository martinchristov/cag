(function(){
	'use strict';
	angular.module('cag').directive('login',function(API){
		return {
			templateUrl:'partials/login.html',
			replace:true,
			link: function($scope,el){
				$scope.user = {
					Preferred_Language: 'en',
					Home_Currency: 'gbp'
				}
				$scope.close = function(){
					$scope.$emit('hideLogin');
				}
				$scope.allowSubmit = function(){
					return true;
				}
				$scope.send = function(){
					console.log('sending',$scope.user);
					API.post('IUser_Web_Access/User_Web_Access_Insert',$scope.user).then(function(d){
						console.log('success',d);
					});
				}
				
			},
			controller: function($scope){
				this.signup = function(){
					
				}
			},
			controllerAs:'loginCtrl'
		}
	})
})();