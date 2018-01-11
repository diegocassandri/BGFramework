'use strict';

var app = angular.module('mainApp');
app.directive("uiInputDateTime", [function(){
	return {
		restrict: "E",
		template: '<div class="edit-row default-focus"><div class="col-md-{{::labelSize}}"><label for="input_{{::fieldId}}" class="edit-row-label">{{::label}}</label></div><div class="edit-row-input col-md-{{::editSize}}"><div id="{{::fieldId}}" class="input-group form_date date {{::fieldId}}" data-format="{{dataFormat}}"><input class="form-control" ng-model="value" type="text" id="input_{{::fieldId}}" placeholder="{{::label}}" ng-readonly="readOnly" mask="{{dataMask || \'99/99/9999 99:99:99\'}}"></input><span class="input-group-addon add-on"> <i class="fa fa-calendar"></span></span></div></div></div>',
		replace: true,
		scope: {
			fieldId: '@',
			field: '@',
			value: '=',
			editSize: '@',
			readOnly: '@'
		},
		link: function($scope, element, attrs){			
			$scope.labelSize = $scope.labelSize || 3;
			if (!$scope.editSize)
				$scope.editSize = 12 - $scope.labelSize;
			var f = $scope.$parent.config.findField($scope.field);
			try{
				$scope.label = app.lang.l["mod_" + $scope.$parent.config.path]["fields"][f.name] || f.displayLabel || f.name;
			}catch(err){
				try{
					$scope.label = f.displayLabel;					
				}catch(err){
					$scope.label = f.name;
				}
			}

			$scope.dataFormat = app.lang.l["formats"]["datetime"];
			$scope.dataMask = app.lang.l["masks"]["datetime"];
			if (!!app.lang.l["languageCode"] && app.lang.l["languageCode"] != 'en'){
				$.fn.datetimepicker.dates[app.lang.l["languageCode"]] = {
				    days: app.lang.l["dates"]["days"],
				    daysShort: app.lang.l["dates"]["daysShort"],
				    daysMin: app.lang.l["dates"]["daysMin"],
				    months: app.lang.l["dates"]["months"],
				    monthsShort: app.lang.l["dates"]["monthsShort"],
				    today: app.lang.l["dates"]["today"],
				    meridiem: ''
				};
			}

			element.datetimepicker({
				language: app.lang.l["languageCode"] || 'en',
				format: $scope.dataFormat
			});			

			var listener = $scope.$watch('value', function(newValue, oldValue) {
			  	if (!oldValue && !!newValue){
					element.data('datetimepicker').setValue(newValue);			  							
					listener();
			  	}
			});
			/*if (!!$scope.value)
				element.data('datetimepicker').setValue($scope.value);			*/
		}
	}
}]);