(function(){
	'use strict';
	angular.module('cag')
		.controller('LandingCtrl',function($scope,$timeout,$sce){
			$scope.showSideStuff = false;
			$scope.showLogin=false;
			$scope.init=false;
			this.currentTab = 'vip meet';

			$timeout(function(){
				//remove
				// $(document).scrollTo(0);
			},300);


			//show side stuff & init sidebar after cover image has loaded
			var img = new Image();
			var a = $('#cover').css('background-image').substr(5);
			a = a.substr(0,a.length-2);
			img.src = a;
			img.onload = function(){
				$timeout(function(){
					$scope.init=true;
				},200);
				$timeout(function(){
					$scope.showSideStuff=true;
				},1000);
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
				date: null,
				passangers:{
					adults: 1,
					children: 0,
					infants: 0
				},
				services:[
					{
						title:'VIP meet',
						count:0,
						desc:'Your Arrival experience will include: Being met at the  aircraft gate. and expedited through immigration.'
					},
					{
						title:'Baggage porter',
						count:0,
						desc:'Your Arrival experience will include: Being met at the  aircraft gate. and expedited through immigration.'
					},
					{
						title:'Executive transfer',
						count:0,
						desc:'Your Arrival experience will include: Being met at the  aircraft gate. and expedited through immigration.'
					},
					{
						title:'United package',
						count:0,
						desc:'Your Arrival experience will include: Being met at the  aircraft gate. and expedited through immigration.'
					}
				]
			};

			$scope.allowQuoteRequest = false;

			$scope.$watch('quote',function(){
				$scope.allowQuoteRequest = false;
				if($scope.quote.airport!='' && $scope.quote.dateD && $scope.quote.dateM && $scope.quote.dateY ){
					var totalSvc = 0;
					for(var i=0;i<$scope.quote.services.length;i++){
						totalSvc+=$scope.quote.services[i].count;
					}
					if(totalSvc>0){
						$scope.allowQuoteRequest = true;
					}
				}
			},true);


			$scope.$on('hidePicker',function(){
				$scope.showQuoteDatePicker=false;
				
				$timeout(function(){
					$('[date-picker]').removeClass('hidden');
					$scope.quote.dateD = $scope.quote.date.format('D');
					$scope.quote.dateM = $scope.quote.date.format('M');
					$scope.quote.dateY = $scope.quote.date.format('YY');
				});
			});



			$scope.services = [
				{
					title:'vip meet',
					image:'images/diamond.svg',
					content:'Whether you are arriving, departing or connecting flights, your personal airport agent will be waiting to meet &amp; assist you at every step of your journey. From the moment you show at the gate, through "fast track" immigration &amp; exclusive lounge access to your luggage being stored in a luxury car, waiting to take you anywhere you want.\
						<br><br>\
						Start booking to customize your experience,<br>\
						exactly the way you want.'
				},
				{
					title:'by invitation',
					image:'images/invitation.svg',
					content:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis reprehenderit tempora minima vel natus voluptas ducimus adipisci animi atque beatae laborum ex delectus dolores, deserunt, aspernatur esse eos dolorum distinctio.\
						<br><br>\
						Start booking to customize your experience,<br>\
						exactly the way you want.'
				},
				{
					title:'on demand',
					image:'images/demand.svg',
					content:'Whether you are arriving, departing or connecting flights, your personal airport agent will be waiting to meet &amp; assist you at every step of your journey. From the moment you show at the gate, through "fast track" immigration &amp; exclusive lounge access to your luggage being stored in a luxury car, waiting to take you anywhere you want.\
						<br><br>\
						Start booking to customize your experience,<br>\
						exactly the way you want.'
				}
			];
			for(var i=0;i<$scope.services.length;i++){
				$sce.trustAs('resourceUrl',$scope.services[i].image);
				$sce.trustAsHtml($scope.services[i].image);
			}

			$scope.getImage = function(img){
				return img;
			};

			$timeout(function(){
				var mySwiper = new Swiper ('.swiper-container', {
					direction: 'horizontal',
					pagination: '.swiper-pagination'
				});
			},200);
		});
})();