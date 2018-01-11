'use strict';

var app = angular.module('mainApp');
app.directive("uiInputText", function(){
	return {
		restrict: "E",
		template: '<div class="edit-row default-focus"><div class="col-md-{{::labelSize}}"><label for="{{::fieldId}}" class="edit-row-label">{{::label}}</label></div><div class="edit-row-input col-md-{{::editSize}}"><input class="form-control" ng-model="value" type="text" id="{{::fieldId}}" placeholder="{{::label}}" ng-readonly="readOnly"></div></div>',
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
				$scope.label = app.lang.l["mod_" + $scope.$parent.config.path]["fields"][f.name];
			}catch(err){
				try{
					$scope.label = f.displayLabel;					
				}catch(err){
					$scope.label = f.name;
				}
			}
		}
	}
});