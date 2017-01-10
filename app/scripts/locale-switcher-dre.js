(function(){
	'use strict';
	angular.module('cag').directive('localeSwitcher',function(){
		return {
			templateUrl:'partials/locale-switcher.html',
			link:function($scope,el){
				$scope.currency='EUR';
				$scope.language='en';
				$scope.langDict = {
					en:'English',
					de:'Deutsch',
					tr:'Turkçe',
					fa:'فرسي'
				}
				$scope.languages = [
					{
						name:'English',
						value:'en'
					},{
						name:'Deutsch',
						value:'de'
					},{
						name:'Turkçe',
						value:'tr'
					},{
						name:'فرسي',
						value:'fa'
					}
				];
			}
		}
	});
})();