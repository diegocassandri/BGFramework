'use strict'

module.exports.instance = function(){
	this.__proto__ = new recordPrototype();
	this.resource = "costumers";
	this.fields = [
		{name: "UserId", isNumber: true},
		{name: "Id", isKey: true, inWhere: true, isNumber: true},		
		{name: "Name"},
		{name: "Address"},
		{name: "PhoneNumber"},
		{name: "Email"},
		{name: "Birthday", isDate: true},
		{name: "Add_Date", isDate: true},
		{name: "Add_Time", isTime: true},
		{name: "Add_TimeStamp", isTimeStamp: true},

	];
}
