'use strict'

module.exports.register_route = function(){

	var validateCostumer = function(rec){
		// Errors Code 0 and 1 are systems erros. Please, use 2 or more.		
		if (!rec.Name)
			error(1, "Field \"Name\" is required.");
		if (!rec.Address)
			error(2, "Field \"Address\" is required.");
		if (!rec.PhoneNumber)
			error(3, "Field \"Phone Number\" is required.");
		if (!rec.Email)
			error(4, "Field \"Email\" is required.");
	}

	return {
		name: 'costumers',
		path: '/costumers',
		hasOrder: true,

		list: function(req, res){			
			getList(__dirname).get(req, res);			
		},

		record: function(req, res){
			getRecord(__dirname).get(req, res);
		},

		insert: function(req, res){ 
			var before = function(rec, callback){				
				validateCostumer(rec);
				callback();
			};
			var after = function(rec, callback){
				callback();
			};
			getRecord(__dirname).insert(req, res, before, after);
		},

		update: function(req, res){			
			var before = function(rec, callback){				
				validateCostumer(rec);
				callback();
			};
			var after = function(rec, callback){
				callback();
			};
			getRecord(__dirname).update(req, res, before, after);
		},

		delete: function(req, res){ 
			var before = function(rec, callback){
				callback();
			};
			var after = function(rec, callback){
				callback();
			};
			getRecord(__dirname).delete(req, res, before, after);
		},
	}
}

