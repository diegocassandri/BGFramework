'use strict'

module.exports.instance = function(){
	this.__proto__ = new recordPrototype();
	this.resource = "products";
	this.fields = [		
		{name: "UserId", isNumber: true},
		{name: "Id", isKey: true, inWhere: true, isNumber: true},		
		{name: "Name"},
		{name: "Description"},
		{name: "Price", isNumber: true},
	];
}
