'use strict';

var app = angular.module('mainApp');
app.directive("uiMonthFilter", ['$filter', function($filter){
	return {
		restrict: "E",
		templateUrl: "app/core/views/uiMonthFilter.html",
		replace: true,
		scope: {
			filter: '='
		},
		link: function($scope, element, attrs){

			var isFirstDay = function(strDate){
				var s = strDate.split('/');
				var d = new Date(s[2], s[1] - 1, 1);
				var strFirst = $filter('date')(d, 'dd/MM/yyyy');
				if (strFirst == strDate)					
					return Number(s[1]);
				else 
					return -1;
			}

			var isLastDay = function(strDate){
				var s = strDate.split('/');
				var d = new Date(s[2], s[1] - 1, 1);
				d.setMonth(d.getMonth() + 1);
				d.setDate(d.getDate() - 1);
				var strFirst = $filter('date')(d, 'dd/MM/yyyy');
				if (strFirst == strDate)					
					return Number(s[1]);
				else 
					return -1;
			}

			var selectMonth = function(){
				$scope.months = [,,,,,,,,,,,];
				var f = isFirstDay($scope.startValue);
				var l = isLastDay($scope.endValue);
				if (f != -1 && l != -1 && f == l)
					$scope.months[f] = 'active';
			}


			$scope.filter.execFilter = function(){
				if (!$scope.startValue || !$scope.endValue) {
					if ($scope.filter.used) {						
						$scope.filter.used = false;
						$scope.filter.filter();
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
				selectMonth();
			}

			$scope.onEndChange = function(newValue, oldValue){
				$scope.endValue = newValue._i;
				selectMonth();
			}

			$scope.$watch('startValue', function(){				
				if ($scope.startValue != $scope.startValueStr){
					if (validateDate($scope.startValue))
						$scope.startValueStr = $scope.startValue;
					selectMonth();
				}
			});

			$scope.$watch('endValue', function(){				
				if ($scope.endValue != $scope.endValueStr){
					if (validateDate($scope.endValue))						
						$scope.endValueStr = $scope.endValue;
					selectMonth();					
				}
			});

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

			$scope.months = [,,,,,,,,,,,];
			$scope.monthClick = function(m){				
				var d = new Date($scope.Year, m - 1, 1);
				$scope.startValue = $filter('date')(d, 'dd/MM/yyyy');
				d.setMonth(d.getMonth() + 1);
				d.setDate(d.getDate() - 1);
				$scope.endValue = $filter('date')(d, 'dd/MM/yyyy');		
				selectMonth();
				$scope.$parent.$parent.filter();		
			}

			$scope.yearClick = function(){				
				$scope.startValue = $filter('date')((new Date($scope.Year, 0, 1)), 'dd/MM/yyyy');
				$scope.endValue = $filter('date')((new Date($scope.Year, 11, 31)), 'dd/MM/yyyy');	
				$scope.$parent.$parent.filter();			
			}

			$scope.decYear = function(){
				$scope.Year--;
			}

			$scope.incYear = function(){
				$scope.Year++;
			}

			$scope.filter.clearFilter = function(){
				$scope.filter.used = false;				
				var d = new Date();
				$scope.Year = d.getFullYear();				
				$scope.startValue = '';
				$scope.endValue = '';
			}	

			var initialize = function(){								
				$scope.months = [,,,,,,,,,,,];				
				var sv = $scope.filter.startValue.split('-');
				var ev = $scope.filter.endValue.split('-');
				var startValue = new Date(sv[0], sv[1] - 1, sv[2]);
				var endValue = new Date(ev[0], ev[1] - 1, ev[2]);

				if ($filter('date')(startValue, 'yyyy-MM-dd') == $scope.filter.startValue && $filter('date')(endValue, 'yyyy-MM-dd') == $scope.filter.endValue){
					$scope.startValue = $filter('date')(startValue, 'dd/MM/yyyy');
					$scope.endValue = $filter('date')(endValue, 'dd/MM/yyyy');
					$scope.Year = startValue.getFullYear();					
				}
				else
					$scope.filter.clearFilter();
			};		
			
			if ($scope.filter.used)
				initialize()
			else			
				$scope.filter.clearFilter();
		}
	}
}]);