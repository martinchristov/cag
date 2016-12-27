(function(){
	'use strict';
	angular.module('cag',['ui.router','ngAnimate','datePicker','ngSanitize'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('landing',{
					url:'/landing',
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
				.state('booking.passangers',{
					url:'/passangers',
					templateUrl: 'views/booking-passangers.html'
				})
				.state('booking.passangers.add',{
					url:'/add',
					templateUrl: 'views/add-passanger.html'
				})
				.state('booking.services',{
					url:'/services',
					templateUrl: 'views/booking-services.html'
				})
				.state('booking.payment',{
					url:'/payment',
					templateUrl: 'views/booking-payment.html'
				})


				/*
				/booking/detials
				/booking/services
				/booking/payment

				/my/bookings
				/my/passangers
				/my/invoices
				/my/profile
				*/


			$urlRouterProvider.otherwise('/landing');
		});
})();