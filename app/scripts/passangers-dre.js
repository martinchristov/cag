(function(){
	'use strict';
	angular.module('cag').directive('passangers',function($timeout){
		return {
			templateUrl:'partials/passangers.html',
			
			replace:true,
			scope:{
				data:'='
			},
			link:function($scope,el){
				// $scope.data = ;
				$scope.total=null;
				$scope.adults = function(n){
					$scope.data.adults+=n;
					if($scope.data.adults<1){
						$scope.data.adults=1;
					}
					$scope.calcTotal();
				};
				$scope.children = function(n){
					$scope.data.children+=n;
					if($scope.data.children<0){
						$scope.data.children=0;
					}
					$scope.calcTotal();
				};
				$scope.infants = function(n){
					$scope.data.infants+=n;
					if($scope.data.infants<0){
						$scope.data.infants=0;
					}
					$scope.calcTotal();
				};
				$scope.calcTotal = function(){
					$scope.total = $scope.data.adults+$scope.data.children+$scope.data.infants;
				};
			}
		}
	});
})();