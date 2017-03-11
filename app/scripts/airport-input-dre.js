(function(){
	'use strict';
	angular.module('cag')
		.directive('airportInput',function($timeout, API){
			return {
				template:[
					'<div class="airport-input">',
						'<div class="fph-input" ng-class="{\'focused\':focused||model||src}">',
							'<div class="ph" ng-click="phclick()">{{placeholder}}</div>',
							'<input ng-keyup="keyup($event)" type="{{type}}" ng-focus="focused=true" ng-blur="focused=false" ng-model="src">',
						'</div>',
						'<div class="dropdown" ng-show="airports.length>0">',
							'<div class="item" ng-class="{\'highlight\':highlight==$index}" ng-click="select(ap)" ng-repeat="ap in airports | limitTo:10">',
								'{{ap.Description}} - {{ap.Airport_Code}}<br>',
								'<small>Country here</small>',
							'</div>',
						'</div>',
					'</div>',
				].join(''),
				scope:{
					placeholder:'@',
					model:'='
				},
				replace:true,
				link:function($scope,el){
					$scope.src='';
					$scope.highlight=-1;
					$scope.phclick=function(){
						el.find('input').focus();
					};
					$scope.airports = [];
					$scope.select = function(airport){
						$scope.model = airport;
						$scope.src=airport.Description+' '+airport.Airport_Code;
						$scope.airports = [];
					}
					$scope.keyup = function(e){
						var stackLength = $scope.airports.length;
						if(stackLength>10){
							stackLength=10;
						}
						if(e.keyCode == 40){
							e.preventDefault();
							//down
							$scope.highlight++;
							if($scope.highlight>stackLength-1){
								$scope.highlight = 0;
							}
						}
						else if(e.keyCode == 38){
							e.preventDefault();
							$scope.highlight--;
							if($scope.highlight<0){
								$scope.highlight = stackLength-1;
							}
						}
						else if(e.keyCode == 13){
							if($scope.highlight!=-1){
								$scope.select($scope.airports[$scope.highlight]);
							}
						}
					};
					var tmid;
					$scope.$watch('src',function(){
						clearInterval(tmid);
						if($scope.src.length>2){
							tmid = setTimeout(function(){
								API.post('IAirport/Airport_Select_Like_Description',{
									sDescription: $scope.src
								}).then(function(d){
									$scope.airports = d;
									$scope.highlight = -1;
								});
							},200);
						}
					});
				}
			}
		});
})();