'use strict'

module.exports.instance = function(){
	this.__proto__ = new listPrototype();
	this.resource = "costumers";
	this.fields = [		
		{name: "Id", inWhere: true, searchable: true, isNumber: true},
		{name: "Name", searchable: true, contains: true},
		{name: "PhoneNumber"},
		{name: "Birthday", isDate: true},
		{name: "Add_Date", isDate: true},
		{name: "Add_Time", isTime: true},
		{name: "Add_TimeStamp", isTimeStamp: true},

	];
}
