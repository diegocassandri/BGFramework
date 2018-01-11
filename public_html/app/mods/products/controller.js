'use strict'

var app = angular.module('mainApp');
app.register.controller('productsCtrl', ['$scope', '$rootScope', '$location', '$timeout', '$filter',
	function($scope, $rootScope, $location, $timeout, $filter){

		$scope.config = {
			path: "products",
			showRefresh: false,
			api: app.restAPI,
			listResource: "products",
			editResource: "products",
			pagination: true,
			publicResource: false,

			getSearch: function(searchText){
				return "name=" + searchText;
			}
		};

		$scope.fields = [
			{name: "Id", fieldType: "integer", primaryKey: true, hide: true},
			{name: "Name", displayLabel: "Name", fieldSize: 85, fieldType: "string", sortable: true, searchable: true, required: true},
			{name: "Description", displayLabel: "Description", hide: true},
			{name: "Price", displayLabel: "Price", fieldSize: 15, fieldType: "string", alignment: "right"},
		];

	}
]);
