'use strict';

var app = angular.module('mainApp');
app.directive("uiEditModal", function(){
	return {
		restrict: "E",
		templateUrl: "app/core/views/uiEditModal.html",
		replace: true,
		link: function($scope, element, attrs){

			$scope.editPath = 'app/mods/' + $scope.config.path + '/edit.html';

			$scope.$watch(attrs.visible, function(value){
				if(value === "open") {
					$(element).modal({backdrop: 'static', keyboard: false});
				}
				else if (value === "close")
					$(element).modal("hide");
			});

			$(element).on('shown.bs.modal', function(){
				$scope.$apply(function(){
					$scope.$parent[attrs.visible] = true;
				});
			});

			$(element).on('hidden.bs.modal', function(){
				$scope.$apply(function(){
					$scope.$parent[attrs.visible] = false;
				});
			});

		}
	}
});
