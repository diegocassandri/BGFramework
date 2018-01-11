'use strict'

var app = angular.module('mainApp');
app.register.controller('costumersCtrl', ['$scope', '$rootScope', '$location', '$timeout', '$filter',
	function($scope, $rootScope, $location, $timeout, $filter){

		var prepareRec = function(rec, scope, operation){	
			if (rec.Birthday){				
				rec.Birthday = $filter('date')(new Date(rec.Birthday), app.lang.l["formats"]["date"]);
			}	
			if (rec.Add_Date){				
				rec.Add_Date = $filter('date')(new Date(rec.Add_Date), app.lang.l["formats"]["date"]);
			}	
			if (rec.Add_Time){				
				rec.Add_Time = $filter('date')(new Date(rec.Add_Time), app.lang.l["formats"]["time"]);
			}	
			if (rec.Add_TimeStamp){				
				rec.Add_TimeStamp = $filter('date')(new Date(rec.Add_TimeStamp), app.lang.l["formats"]["datetime"]);
			}	
			rec.PhoneNumber = $filter('tel')(rec.PhoneNumber); 
		}

		$scope.config = {
			path: "costumers",
			showRefresh: false,
			api: app.restAPI,
			listResource: "costumers",
			editResource: "costumers",
			pagination: true,
			publicResource: false,

			afterLoad: function(dataset, scope){
				dataset.rows.forEach(function(rec){
					prepareRec(rec, scope, 'browse');
				});
			},
			getSearch: function(searchText){
				return "name=" + searchText;
			}
		};

		$scope.fields = [
			{name: "Id", fieldType: "integer", primaryKey: true, hide: true},
			{name: "Name", displayLabel: "Name", fieldSize: 70, fieldType: "string", sortable: true, searchable: true, required: true},
			{name: "Address", displayLabel: "Address", hide: true},
			{name: "PhoneNumber", displayLabel: "Phone Number", fieldSize: 15, fieldType: "string", alignment: "center"},
			{name: "Birthday", displayLabel: "Birthday", fieldSize: 15, fieldType: "date", sortable: true, alignment: "center"},
			{name: "Add_Date", displayLabel: "Date", fieldSize: 15, fieldType: "date", sortable: true, alignment: "center"},
			{name: "Add_Time", displayLabel: "Time", fieldSize: 15, fieldType: "time", sortable: true, alignment: "center"},
			{name: "Add_TimeStamp", displayLabel: "TimeStamp", fieldSize: 15, fieldType: "datetime", sortable: true, alignment: "center"},
			{name: "Email", displayLabel: "Email", hide: true},
		];

	}
]);