(function(){
	'use strict';
	angular.module('cag').directive('services',function($timeout){
		return {
			templateUrl:'partials/services.html',
			
			replace:true,
			scope:{
				items:'='
			},
			link:function($scope,el){
				$scope.total=null;
				// $scope.items = ;
				$scope.plus = function(i,n){
					$scope.items[i].count+=n;
					if($scope.items[i].count<0){
						$scope.items[i].count=1;
					}
					$scope.calcTotal();
				};
				$scope.readMore = function(item){
					for(var i=0;i<$scope.items.length;i++){
						$scope.items[i].readMore=false;
					}
					item.readMore=true;
					$scope.expanded=true;
				};
				$scope.readLess = function(item){
					item.readMore=false;
					$scope.expanded=false;
				};
				$scope.calcTotal = function(){
					var total = 0;
					for(var i=0;i<$scope.items.length;i++){
						total+= $scope.items[i].count;
					}
					if(total>0){
						$scope.total = total;
					}
				};
			}
		}
	});
})();