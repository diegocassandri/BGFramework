'use strict'

module.exports.register_route = function(){
	return {
		name: 'dashboard',
		path: '/dashboard',
		list: function(req, res){
			try{
				var params = {};
				var query;
				if (!!req.query && Object.keys(req.query).length !== 0){
					query = req.query;
					for (var q in query){
						params[q.toLowerCase()] = query[q];
					}
				}
				var UserId = -1;
				if (!!req.token_obj)
					UserId = req.token_obj.Account;				
				var sql = "SELECT ";
				sql += " (SELECT COUNT(*) FROM Costumers WHERE UserId = " + UserId + ") costumersCount,";
				sql += " (SELECT COUNT(*) FROM Products WHERE UserId = "  + UserId + ") productsCount";
				sql += " FROM RDB$DATABASE";

				global.db_conn.get(function(err, db){
					if (err)
						throw err;

					db.query(sql, function(error, result, fields){
						db.detach();
						if (!!error) {
							console.log('' + error);
							res.status(500).send('Cannot GET.');
						}
						else
							res.send(result);
					});
				});

			} catch(err){
				console.log(err);
				res.status(500).send('Cannot GET: ' + err);
			}
		},
	}
}

