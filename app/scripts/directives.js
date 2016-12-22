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
		.directive('scrollBackground',function(UISvc){
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
					UISvc.scroll(function(top){
						var s = top/$(window).height();
						if(s<=1){
							el.css({'background-position-y':-s*luft});
						}
					});
					$(window).resize(calc);
				}
			}
		})
		.directive('scrollBackgroundX',function(UISvc){
			return {
				link: function($scope,el,attr){
					
					var luft = 0;
					var w = 1813;
					function calc() {
						luft = (w - $(window).width())/2;
					}
					$(window).resize(calc);
					calc();
					UISvc.scroll(function(top){
						var s = ((top-210)-el.offset().top+el.height())/$(window).height();
						if(s<=1){
							el.css({'background-position-x':-s*luft});
						}
					});
				}
			}
		})
		.directive('scrollBind',function(UISvc){
			return {
				link: function($scope,el,attr){
					UISvc.scroll(function(top){
						if(top + $(window).height() > el.offset().top){
							var diff = (top + $(window).height()) - el.offset().top;
							diff /= 130;
							if(diff>1){
								diff = 1;
							}
							el.css({
								'transform':'translateY('+(-100+(diff*100))+'px)'
							});
						}
					});
				}
			}
		})
		.directive('dropdown',function($timeout){
			return {
				templateUrl:'partials/dropdown.html',
				scope:{
					placeholder:'@',
					display:'@',
					model:'=',
					options:'='
				},
				replace:true,
				link:function($scope,el){

					$scope.val = function(){
						if(!$scope.selected){
							return $scope.placeholder;
						}
						else {
							return $scope.selected[$scope.display];
						}
					};
					// $scope.showOverlay=true;
					$scope.select = function(val){
						$scope.selected = val;
						$scope.showOverlay=false;
					};
					$timeout(function(){
						// el.find('.overlay').css({height:$scope.options.length*20+20})
					})
				}
			}
		})
		.directive('fphInput',function($timeout){
			return {
				template:[
					'<div class="fph-input" ng-class="{\'focused\':focused||model}">',
						'<div class="ph" ng-click="phclick()">{{placeholder}}</div>',
						'<input type="{{type}}" ng-focus="focused=true" ng-blur="focused=false" ng-model="model">',
					'</div>',
				].join(''),
				scope:{
					type:'@',
					placeholder:'@',
					model:'='
				},
				replace:true,
				link:function($scope,el){
					$scope.phclick=function(){
						el.find('input').focus();
					};
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

		.directive('passangers',function($timeout){
			return {
				templateUrl:'partials/passangers.html',
				
				replace:true,
				link:function($scope,el){
					$scope.data = {
						adults: 1,
						children: 0,
						infants: 0
					};
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
		})

		.directive('lang',function(){
			return {
				templateUrl:'partials/lang.html',
				replace:true,
				restrict:'E',
				link: function($scope,el){
					$scope.opts = ['en','de','jpn','zh'];
					$scope.current = 'en';
					$scope.change = function(to){
						$scope.current = to;
						$scope.drop=false;
					};
				}
			}
		})
		.service('UISvc',function(){
			var self = this;
			var scrollFCs = [];
			self.scroll = function(fc){
				scrollFCs.push(fc);
			}
			$(document).scroll(function(){
				var top = $(document).scrollTop();
				for(var i=0;i<scrollFCs.length;i++){
					scrollFCs[i](top);
				}
			});
		})
		.directive('backTop',function(UISvc, $timeout){
			return {
				link: function($scope,el){
					$scope.scrolled=false;
					UISvc.scroll(function(top){
						if(!$scope.scrolled){
							if(top > el.parent().offset().top - $(window).height()){
								$timeout(function(){
									$scope.scrolled = true;
								});
							}
						}
					});
					el.click(function(){
						$.scrollTo(0,700);
					});
				}
			}
		})
		.directive('bar',function(UISvc){
			return {
				link: function($scope,el){
					var cover = $('#cover');
					var scrolled=false;

					UISvc.scroll(function(top){
						if(!scrolled){
							if(top>cover.height()-20){
								scrolled=true;
								el.addClass('scrolled');
							}
						}
						else {
							if(top<cover.height()){
								scrolled=false;
								el.removeClass('scrolled');
							}
						}
					});

					el.find('a.link').each(function(){
						$(this).click(function(e){
							e.preventDefault();
							$.scrollTo($($(this).attr('href')),500);
						})
					})
				}
			}
		});
})();