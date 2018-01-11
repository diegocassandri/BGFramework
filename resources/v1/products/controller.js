'use strict'

module.exports.register_route = function(){

	var validateRecord = function(rec){
		if (!rec.Name)
			error(2, "Field \"Name\" is required.");
	};

	return {
		name: 'products',
		path: '/products',
		hasOrder: true,

		list: function(req, res){			
			getList(__dirname).get(req, res);			
		},

		record: function(req, res){
			getRecord(__dirname).get(req, res);
		},

		insert: function(req, res){ 
			var before = function(rec, callback){
				validateRecord(rec);
				callback();
			};
			var after = function(rec, callback){
				callback();
			};
			getRecord(__dirname).insert(req, res, before, after);
		},

		update: function(req, res){
			var before = function(rec, callback){
				validateRecord(rec);
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

