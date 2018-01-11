'use strict'

var app = angular.module('mainApp');
app.register.controller('dashboardCtrl', ['$scope', '$rootScope', '$location', '$filter',
	function($scope, $rootScope, $location, $filter){

		var resetData = function(){
			$scope.costumerCount = null;
			$scope.productsCount = null;
		}();

		app.restAPI.get('dashboard', false).then(
			function(res){				
				if (!!res.data){					
					$scope.costumerCount = res.data[0].COSTUMERSCOUNT || 0;
					$scope.productsCount = res.data[0].PRODUCTSCOUNT || 0;
				} else{
					resetData();	
				}				
			},
			function(res){
				resetData();				
			}
		);
	}
]);