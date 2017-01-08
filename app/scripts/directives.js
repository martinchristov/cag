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
		.directive('goBack',function($state){
			return {
				link: function($scope,el){
					var prevState;
					$scope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
						prevState = from.name;
					});
					el.click(function(){
						$state.go(prevState);
					});
				}
			}
		})
		.directive('cusrc',function(){
			return {
				replace:true,
				scope:{
					src:'='
				},
				template:[
					'<ng-include ng-src="\{{src}}\"></ng-include>'
				].join(''),
				link: function($scope,el,attr){
					console.log($scope.src);
				}
			}
		})
		.filter('firstLetterFilter',function(){
			return function(items, letter){
				if(letter==''){
					return items;
				}
				var filtered = [];

				angular.forEach(items, function(item){
					if(item.name[0].toLowerCase()==letter.toLowerCase()){
						filtered.push(item);
					}
				});
				return filtered;
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
					options:'=',
					key:'@'
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
					$scope.select = function(val){
						$scope.selected = val;
						$scope.showOverlay=false;
					};
					if($scope.model){
						for(var i=0;i<$scope.options.length;i++){
							console.log($scope.options[i][$scope.key]);
							if($scope.options[i][$scope.key]==$scope.model){
								$scope.selected = $scope.options[i];
								return;
							}
						}
					}
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
							console.log(val,oval,'asdas');
							$scope.switch($scope.type);
						}
						else {
							privateChange=false;
						}
					});

					$timeout(function(){
						$scope.switch($scope.types[0]);
					});
				}
			}
		})

		.directive('passangers',function($timeout){
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
		})
		.directive('services',function($timeout){
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

		.directive('progressHeader',function(){
			return {
				templateUrl:'partials/progress-header.html',
				replace:true,
				restrict:'E',
				link: function($scope,el){
					$scope.expanded=false;
					$scope.$on('collapseProgressHeader',function(){
						$scope.expanded=false;
					});
					$scope.$on('expandProgressHeader',function(){
						$scope.expanded=true;
					});
				}
			}
		})

		.directive('progressBar',function(ProgressBar, $state){
			return {
				templateUrl:'partials/progress-bar.html',
				replace:true,
				restrict:'E',
				link: function($scope,el){
					var $bar = el.find('.bar');
					$scope.svc = ProgressBar;
					$scope.state = $state.current;
					$scope.$on('$stateChangeSuccess',function(){
						$scope.state = $state.current;
					});
					var states = ['details','passangers','services','payment'];
					$scope.back = function(){
						var state = $state.current.name.substr(8);
						for(var i=0;i<states.length;i++){
							if(states[i]==state){
								$state.go('booking.'+states[i-1]);
								break;
							}
						}
					};
				}
			}
		})
		.directive('menuPadding',function(){
			return {
				link: function($scope,el){
					$(window).resize(calc);
					var container = $('.main-container:first');
					function calc() {
						var p = ($(window).width()-container.width())/2;
						el.find('li').css({paddingRight:p});
					}
					calc();
				}
			}
		})

		.directive('counter',function(){
			return {
				template:[
					'<div class="counter">',
						'<div class="ctrl" ng-click="num(1)">+</div>',
						'<div class="num">{{model}}</div>',
						'<div class="ctrl" ng-click="num(-1)">-</div>',
					'</div>'
				].join(''),
				replace:true,
				restrict:'E',
				scope:{
					model:'=',
					event:'@'
				},
				link: function($scope,el){
					$scope.min = 1;
					$scope.num = function(val){
						$scope.model+=val;
						if($scope.model<$scope.min){
							$scope.model=$scope.min;
						}
						if($scope.event){
							$scope.$emit('changeSlots');
						}
					}
				}
			}
		})

		.directive('passangerDropdown',function($state){
			return {
				template:[
				'<div class="passanger-dropdown">',
					'<div ng-click="showDropdown=true">',
						'<span ng-hide="selected">add passanger {{index}} info</span>',
						'<span ng-show="selected">{{selected.name}}</span>',
						'<ng-include src="\'images/pointer.svg\'"></ng-include>',
					'</div>',
					'<div class="dropdown" ng-show="showDropdown">',
						'<ul>',
							'<li ng-click="add()">+ new passanger</li>',
							'<li ng-click="select(contact)" ng-repeat="contact in existing">{{contact.name}}</li>',
						'</ul>',
					'</div>',
				'</div>'
				].join(''),
				replace:true,
				restrict:'E',
				scope:{
					index:'@'
				},
				link: function($scope,el){
					$scope.existing = [
						{
							name:'Hannah Morby',
							id:1
						},
						{
							name:'Martin Christov',
							id:2
						},
						{
							name:'Iliyan Oprev',
							id:3
						}
					];
					$scope.add = function(){
						$scope.showDropdown=false;
						$state.go('.add');
					};
					$scope.select = function(contact){
						$scope.showDropdown=false;
						$scope.selected=contact;
						$scope.$emit('selectedPassanger');
					};
				}
			}
		})

		.directive('hackSrc',function(){
			return {
				link: function($scope,el,attr){
					el.attr({src:attr.hackSrc});
				}
			}
		})
		.directive('winHeightMinus',function(){
			return {
				
				link:function($scope,el,attr){
					var setAttr = 'height';
					if(attr.mode){
						setAttr=attr.mode;
					}
					var minVar = Number(attr.winHeightMinus);
					if($(window).width()<460){
						if(attr.mob){
							minVar = Number(attr.mob);
							console.log('blah');
						}
					}
					function set () {
						var props = {};
						props[setAttr]=window.innerHeight-minVar;
						el.css(props);
					}
					set();
					$(window).resize(set);
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
		.service('ProgressBar',function(){
			var self = this;
			self.fill = 0.01;
			self.set = function(val){
				self.fill = val;
			}
		})
		.service('API',function($soap){
			var url = 'http://dev-system.globalairportconcierge.com:8990/GlobalAirportConcierge.svc';
			var params = {
				InterfaceKey:'D6B441402AD64E2906'
			}
			$soap.post(url,'Airport_Select_ALL',params).then(function(d){
				console.log(d);
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