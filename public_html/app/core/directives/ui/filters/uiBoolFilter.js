'use strict';

var app = angular.module('mainApp');
app.directive("uiBoolFilter", ['$filter', function($filter){
	return {
		restrict: "E",
		templateUrl: "app/core/views/uiBoolFilter.html",
		replace: true,
		scope: {
			filter: '='
		},
		link: function($scope, element, attrs){
			$scope.trueSelected = false;
			$scope.falseSelected = false;
			
			$scope.filter.execFilter = function(){			
				if ($scope.trueSelected == $scope.falseSelected){
					if ($scope.filter.used){
						$scope.filter.used = false;
					}
					return;
				}					
				if ($scope.trueSelected)
					$scope.filter.value = $scope.filter.trueValue;
				else if ($scope.falseSelected)
					$scope.filter.value = $scope.filter.falseValue;
				$scope.filter.used = true;
				//$scope.filter.filter();
			}
			
			$scope.filter.clearFilter = function(){
				$scope.filter.used = false;
				$scope.trueSelected = false;
				$scope.falseSelected = false;
			}			

			if ($scope.filter.used && $scope.filter.value){
				if ($scope.filter.value == $scope.filter.trueValue)
					$scope.trueSelected = true;
				else if ($scope.filter.value == $scope.filter.falseValue)
					$scope.falseSelected = true;
			}
			else
				$scope.filter.clearFilter();
		}
	}
}]);