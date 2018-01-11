'use strict'

module.exports.instance = function(){
	this.__proto__ = new listPrototype();
	this.resource = "products";
	this.fields = [
		{name: "UserId", inWhere: true, isNumber: true},
		{name: "Id", inWhere: true, searchable: true, isNumber: true},
		{name: "Name", searchable: true, contains: true},
		{name: "Description", searchable: true},
		{name: "Price", searchable: true, isNumber: true},

	];
}
