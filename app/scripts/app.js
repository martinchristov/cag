(function(){
	'use strict';
	angular.module('cag',['ui.router','ngAnimate','datePicker','ngSanitize','angularSoap','pascalprecht.translate'])
		.config(function($stateProvider,$urlRouterProvider,$translateProvider){
			///Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222  --disable-web-security --user-data-dir
			//D6B441402AD64E2906
			$translateProvider.useSanitizeValueStrategy('escapeParameters');
			$stateProvider
				.state('landing',{
					url:'/',
					templateUrl:'views/landing.html',
					controller: 'LandingCtrl',
					controllerAs: 'ctrl'
				})
				.state('booking',{
					url:'/booking',
					templateUrl:'views/booking.html',
					controller: 'BookingCtrl',
					controllerAs:'ctrl'
				})
				.state('booking.details',{
					url:'/details',
					templateUrl: 'views/booking-details.html'
				})
				.state('booking.passengers',{
					url:'/passengers',
					templateUrl: 'views/booking-passengers.html'
				})
				.state('booking.passengers.add',{
					url:'/add',
					controller:'AddPassengerCtrl',
					templateUrl: 'views/add-passenger.html'
				})
				.state('booking.passengers.edit',{
					url:'/edit/:id',
					templateUrl: 'views/add-passenger.html'
				})
				.state('booking.services',{
					url:'/services',
					templateUrl: 'views/booking-services.html'
				})
				.state('booking.payment',{
					url:'/payment',
					templateUrl: 'views/booking-payment.html'
				})


				.state('my',{
					url:'/my',
					templateUrl:'views/my.html',
					controller: 'MyCtrl',
					controllerAs:'ctrl'
				})
				.state('my.bookings',{
					url:'/bookings',
					templateUrl: 'views/my-bookings.html'
				})
				.state('my.passengers',{
					url:'/passengers',
					templateUrl: 'views/my-passengers.html'
				})
				.state('my.passengers.add',{
					url:'/add',
					templateUrl: 'views/add-passenger.html'
				})
				.state('my.receipts',{
					url:'/receipts',
					templateUrl: 'views/my-receipts.html'
				})
				.state('my.profile',{
					url:'/profile',
					templateUrl: 'views/my-profile.html'
				})
				.state('my.support',{
					url:'/support',
					templateUrl: 'views/my-support.html'
				})
				/*
				/booking/detials
				/booking/services
				/booking/payment

				/my/bookings
				/my/passengers
				/my/invoices
				/my/profile
				*/


			$urlRouterProvider.otherwise('/');
		});
})();