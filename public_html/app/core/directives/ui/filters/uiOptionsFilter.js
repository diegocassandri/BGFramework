'use strict';

var app = angular.module('mainApp');
app.directive("uiOptionsFilter", ['$filter', function($filter){
	return {
		restrict: "E",
		templateUrl: "app/core/views/uiOptionsFilter.html",
		replace: true,
		scope: {
			filter: '='
		},
		link: function($scope, element, attrs){			
			$scope.filter.execFilter = function(){
				var allFalse = true;
				$scope.filter.value = '';	
				$scope.filter.items.forEach(function(i){
					if (i.selected){
						$scope.filter.value += ($scope.filter.value ? '|' : '') + i.value;
						allFalse = false;
					}
				});

				if (allFalse){
					if ($scope.filter.used){
						$scope.filter.used = false;	
						$scope.filter.filter();
					}
					return;
				}
				$scope.filter.used = true;	
				//$scope.filter.filter();
			}
			
			$scope.filter.clearFilter = function(){
				$scope.filter.used = false;
				$scope.filter.items.forEach(function(i){
					i.selected = false;
				});
			}			


			if ($scope.filter.used && $scope.filter.value){
				var values = $scope.filter.value.split('|');
				$scope.filter.items.forEach(function(i){					
					values.forEach(function(v){
						if (v == i.value){
							i.selected = true;
						}
					});
				});
			}
			else
				$scope.filter.clearFilter();
		}
	}
}]);