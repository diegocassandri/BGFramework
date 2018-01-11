'use strict';

var app = angular.module('mainApp');
app.directive("uiDateFilter", ['$filter', function($filter){
	return {
		restrict: "E",
		templateUrl: "app/core/views/uiDateFilter.html",
		replace: true,
		scope: {
			filter: '='
		},
		link: function($scope, element, attrs){

			$scope.startValueError = '';
			$scope.endValueError = '';
			$scope.filter.execFilter = function(){
				if (!$scope.startValue || !$scope.endValue) {
					if ($scope.filter.used) {						
						$scope.filter.used = false;
					}
					return;
				}			
				$scope.startValueError = '';
				$scope.endValueError = '';
				if (!validateDate($scope.startValue))
					$scope.startValueError = "has-error";					
				if (!validateDate($scope.endValue))
					$scope.endValueError = "has-error";	
				if ($scope.startValueError || $scope.endValueError)
					return
				var d = $scope.startValue.split('/');
				$scope.filter.startValue = $filter('date')((new Date(d[2], d[1] - 1, d[0])), 'yyyy-MM-dd');
				d = $scope.endValue.split('/');
				$scope.filter.endValue = $filter('date')((new Date(d[2], d[1] - 1, d[0])), 'yyyy-MM-dd');

				if ($scope.filter.startValue > $scope.filter.endValue)
					$scope.endValueError = "has-error";	
				if ($scope.startValueError && $scope.endValueError)
					return;
				$scope.filter.used = true;
			}

			$scope.onStartChange = function(newValue, oldValue){
				$scope.startValue = newValue._i;
			}

			$scope.onEndChange = function(newValue, oldValue){
				$scope.endValue = newValue._i;
			}

			var validateDate = function(strDate){
				try{
					var s = strDate.split('/');
					var d = new Date(s[2], s[1] - 1, s[0]);
					if (s[2].length != 4)
						return false;
					if (d.getFullYear() != s[2] || d.getMonth() != s[1] - 1 || d.getDate() != s[0])
						return false
					
					return true
				}catch(err){
					return false
				}
			}

			$scope.filter.clearFilter = function(){			
				$scope.filter.used = false;
				var d = new Date();
				$scope.startValue = '';
				$scope.endValue = '';
			}		

			var initialize = function(){				
				var sv = $scope.filter.startValue.split('-');
				var ev = $scope.filter.endValue.split('-');
				var startValue = new Date(sv[0], sv[1] - 1, sv[2]);
				var endValue = new Date(ev[0], ev[1] - 1, ev[2]);

				if ($filter('date')(startValue, 'yyyy-MM-dd') == $scope.filter.startValue && $filter('date')(endValue, 'yyyy-MM-dd') == $scope.filter.endValue){
					$scope.startValue = $filter('date')(startValue, 'dd/MM/yyyy');
					$scope.endValue = $filter('date')(endValue, 'dd/MM/yyyy');
				}
				else
					$scope.filter.clearFilter();
			}

			if ($scope.filter.used)
				initialize();
			else
				$scope.filter.clearFilter();

			$scope.$watch('startValue', function(){				
				if ($scope.startValue != $scope.startValueStr && validateDate($scope.startValue)){
					$scope.startValueStr = $scope.startValue;
				}
			});

			$scope.$watch('endValue', function(){				
				if ($scope.endValue != $scope.endValueStr && validateDate($scope.endValue)){
					$scope.endValueStr = $scope.endValue;
				}
			});
		}
	}
}]);