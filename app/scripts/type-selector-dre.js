(function(){
	'use strict';
	angular.module('cag').directive('typeSelector',function($timeout){
		return {
			templateUrl:'partials/type-selector.html',
			scope:{
				type:'=',
				types:'='
			},
			replace:true,
			link:function($scope,el){
				var dash = el.find('.type-dash');
				dash.css({width:el.find('.type:first').width()+7});
				if(!$scope.types){
					$scope.types=['ARRIVAL','DEPARTURE','CONNECT'];
				}
				var privateChange = true;
				$scope.clickSwitch = function(to){
					privateChange=true;
					$scope.switch(to);
				}
				$scope.switch = function(to){
					$scope.type=to;
					$timeout(function(){
						var cur = el.find('.type.current');
						var curIndex = cur.data('index');
						var css = {
							width: cur.width(),
							marginLeft: 0,
							left: 0
						};
						if(curIndex==2){
							css.marginLeft = -css.width/2
							css.left='50%';
						}
						else if(curIndex==3){
							css.left = el.width()-css.width
						}
						dash.css(css).removeClass('float-1').removeClass('float-2').removeClass('float-3').addClass('float-'+curIndex);
					},50);
				};

				$scope.$watch('type',function(val,oval){
					if(!privateChange){
						$scope.switch($scope.type);
					}
					else {
						privateChange=false;
					}
				});

				$timeout(function(){
					$scope.switch($scope.types[0]);
				},100);
			}
		}
	});
})();