(function(){
	'use strict';
	
	angular.module('cag')
		.directive('windowHeight',function(){
			return {
				link: function($scope,el){
					$(window).resize(function(){
						el.css({height: $(window).height()});
					}).resize();
				}
			}
		})
		.directive('scrollBackground',function(){
			return {
				link: function($scope,el,attr){
					var img = new Image();
					var a = el.css('background-image').substr(5);
					a = a.substr(0,a.length-2);
					img.src = a;
					img.onload = function(){
						calc();
					}
					var luft = 0;
					function calc() {
						var imgProp = img.width/img.height;
						var w = $(window).width();
						var h = w/imgProp;
						luft = h - $(window).height();

						if(luft<0){
							luft = 0;
							el.css({'background-position-y':0});
						}
					}
					$(document).scroll(function(){
						var s = $(document).scrollTop()/$(window).height();
						if(s<=1){
							el.css({'background-position-y':-s*luft});
						}
					});
					$(window).resize(calc);
				}
			}
		})
		.directive('typeSelector',function($timeout){
			return {
				templateUrl:'partials/type-selector.html',
				scope:{
					type:'='
				},
				replace:true,
				link:function($scope,el){
					var dash = el.find('.type-dash');
					dash.css({width:el.find('.type:first').width()+7});

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

					$timeout(function(){
						$scope.switch('arrival');
					});
				}
			}
		})
		.directive('login',function(){
			return {
				templateUrl:'partials/login.html',
				replace:true,
				link: function($scope,el){
					$scope.close = function(){
						$scope.$emit('hideLogin');
					}
				}
			}
		});
})();