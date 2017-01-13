(function(){
	'use strict';
	angular.module('cag',['ui.router','ngAnimate','datePicker','ngSanitize','angularSoap'])
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
				.state('my.invoices',{
					url:'/invoices',
					templateUrl: 'views/my-invoices.html'
				})
				.state('my.profile',{
					url:'/profile',
					templateUrl: 'views/my-profile.html'
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


			$urlRouterProvider.otherwise('/landing');
		});
})();