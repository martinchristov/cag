(function(){
	'use strict';
	angular.module('cag')
		.controller('BookingCtrl',function($scope,$state,ProgressBar,API){
			var self = this;
			if($state.current.name=='booking'){
				$state.go('booking.details');
			}
			$scope.details = {
				type:'DEPARTURE',
				airport:'',
				flightCode:'',
				dd:'',
				mm:'',
				yy:'',
				terminal:'',
				time:''
			};



			$scope.enableDetailsSubmit = false;
			var unwatchDetails = $scope.$watch('details',function(){
				var total = 0, length=0;
				for(var a in $scope.details){
					length++;
					if($scope.details[a]!=''){
						total++;
					}
				}
				var percent = total/length;
				ProgressBar.set((percent/2)/3);
				if(percent==1){
					unwatchDetails();
					$scope.enableDetailsSubmit = true;
				}
			},true);

			//passangers
			$scope.passangers = [null];
			self.passangerSlots = 1;
			// $scope.passangerEmptySlots = [];
			$scope.$watch('ctrl.passangerSlots',function(val,valu){
				if($scope.passangers.length<self.passangerSlots){
					for(var i=$scope.passangers.length;i<self.passangerSlots;i++){
						$scope.passangers.push(null);
					}
				}
				else if($scope.passangers.length>self.passangerSlots){
					for(var i=$scope.passangers.length;i>self.passangerSlots;i--){
						$scope.passangers.pop();
					}
				}
			});

			$scope.$on('selectedPassanger',function(){
				ProgressBar.set(1/3);
			});


			//Services
			$scope.servicesView = 0;
			// $scope.servicesViews=['meetup','ondemand','transport'];
			$scope.serviceTypes=['meet up','on demand','transport'];
			$scope.$watch('ctrl.serviceType',function(){
				for(var i=0;i<$scope.serviceTypes.length;i++){
					if($scope.serviceTypes[i]==self.serviceType){
						$scope.servicesView = i;
					}
				}
			});
			$scope.nextServices = function(){
				ProgressBar.set((1/3)+(($scope.servicesView+1)/3)/3);
				if($scope.servicesView<2){
					$scope.servicesView++;
					self.serviceType=$scope.serviceTypes[$scope.servicesView];
				}
				else {
					$state.go('booking.payment');
				}
				// $scope.servicesView 
			};



			$scope.services = [
				[
					{
						title:'VIP meet',
						description:'Your arrival experience will include: Being met at the aircraft gate and expedited through immigration',
						price:160
					},
					{
						title:'Baggage Porter',
						description:'Your arrival experience will include: Being met at the aircraft gate and expedited through immigration',
						price:45
					}
				],
				[
					{
						title:'Sample title 2',
						description:'Your arrival experience will include: Being met at the aircraft gate and expedited through immigration',
						price:160
					},
					{
						title:'Sample title 3',
						description:'Your arrival experience will include: Being met at the aircraft gate and expedited through immigration',
						price:45
					}
				],
				[
					{
						title:'Whatever here',
						description:'Your arrival experience will include: Being met at the aircraft gate and expedited through immigration',
						price:160
					},
					{
						title:'Another there',
						description:'Your arrival experience will include: Being met at the aircraft gate and expedited through immigration',
						price:45
					}
				]
			];

			for(var i=0;i<$scope.services.length;i++){
				for(var j=0;j<$scope.services[i].length;j++){
					$scope.services[i][j].quantity=0;
				}
			}
			$scope.services[0][0].quantity=1;

			$scope.navBackTo = function(to){
				$scope.$broadcast('collapseProgressHeader');
				$state.go('booking.'+to);
			};

			$scope.payment = {
				card:'', mm:'', yy:'', cvc:''
			};
			var unwatchPayment = $scope.$watch('payment',function(newval,oldval){
				if(newval!==oldval){
					var total = 0, length=0;
					for(var a in $scope.payment){
						length++;
						if($scope.payment[a]!=''){
							total++;
						}
					}
					var percent = total/length;
						
					ProgressBar.set(2/3 + percent/4);
					if(percent==1){
						unwatchPayment();
						$scope.enableDetailsSubmit = true;
					}
				}
			},true);

			$scope.paymentComplete = function(){
				$scope.paymentDone = true;
				$scope.$broadcast('expandProgressHeader');
			}

		});
})();