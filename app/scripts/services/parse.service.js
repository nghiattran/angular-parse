
'use strict';
/** @ngInject */
angular
    .module('parseServies', [
  	])
  .service('parseServies', function Database($rootScope, $q) 
	{
		
		var parseParams = {include: "_include", limit: "_limit", skip: "_skip", where: "_where", keys: "_select", order: "_order"};
		var pointerMapping;

		// set Parse keys
		Database.prototype.setKeys = function(applicationId, javascriptKey){
			Parse.initialize(applicationId, javascriptKey);
		};

		// Set mapping Pointer
		Database.prototype.setPointerMapping = function(setting){
			pointerMapping = setting;
		};

		// Encode parse pointer from objectId to {__type: "Pointer", className: table, objectId: objectId}
		Database.prototype.encodeQuery = function(query){
			var keys = Object.keys(query);
			for (var i = 0; i < keys.length; i++) 
			{
				if (pointerMapping[keys[i]]) {
					query[keys[i]] = {
					  __type: "Pointer",
		        className: pointerMapping[keys[i]],
		        objectId: query[keys[i]]
			    };
				}

				if (typeof(query[keys[i]]) === 'object') {
					Database.prototype.encodeQuery(query[keys[i]]);
				}
			}
			return query;
		};

		// Decode parse pointer from object type to a string of objectId only
		Database.prototype.decodeData = function(query){
			var keys = {};
			if (typeof(query) === 'object' && query !== null) {
				keys = Object.keys(query);
			}
			for (var i = 0; i < keys.length; i++) 
			{
				if (pointerMapping[keys[i]]) {
					query[keys[i]] = query[keys[i]].objectId;
				}
				if (typeof(query[keys[i]]) === 'object') {
					Database.prototype.decodeData(query[keys[i]]);
				}
			}
			return query;
		};

		// TODO: these two functions are not well written
		// Strip down array of results to remove unnecessary data
		Database.prototype.stripArray = function(data){
			var objects = [];
			var keys = [];
			for (var x = 0; x < data.length; x++) {
				var object = {};
				keys[x] = Object.keys(data[x].attributes);
				object.objectId = data[x].id;
				for (var y = 0; y < keys[x].length; y++) {
					if (data[x].attributes[keys[x][y]] && data[x].attributes[keys[x][y]].attributes) {
						object[keys[x][y]] = Database.prototype.stripObject(data[x].attributes[keys[x][y]]);
					} else {
						object[keys[x][y]] = data[x].attributes[keys[x][y]];
					}
				}
				objects.push(object);
			}
			return objects;
		};

		Database.prototype.stripObject = function(data){
			var object = {};
			var keys = Object.keys(data.attributes);
			object.objectId = data.id;
			for (var i = 0; i < keys.length; i++) {
				object[keys[i]] = data.attributes[keys[i]];
				if (data.attributes[keys[i]] && data.attributes[keys[i]].attributes) {
					object[keys[i]] = Database.prototype.stripObject(data.attributes[keys[i]]);
				} else {
					object[keys[i]] = data.attributes[keys[i]];
				}
			}
			return object;
		};

		// Users
		Database.prototype.signup = function(data){
			var user = new Parse.User();
			user.set("username", data.username);
			user.set("password", data.password);
			user.set("email", data.email);

			var deferred = $q.defer();
			user.signUp(null, {
			  success: function(data) {
			    var results = new Database();
					results.setPointerMapping(pointerMapping);
					deferred.resolve({'results': results.decodeData(results.stripObject(data))});
			  },
			  error: function(data, error) {
			  	handleParseError(error.code);
			    deferred.resolve({'results':{'error': error.message, 'code': error.code}});
			  }
			});
			return deferred.promise;
		};

		Database.prototype.login = function(data){
			var deferred = $q.defer();
			Parse.User.logIn(data.username, data.password, {
				success: function(data) {
					var results = new Database();
					results.setPointerMapping(pointerMapping);
					deferred.resolve({'results': results.decodeData(results.stripObject(data))});
				},
				error: function(data, error) {
					handleParseError(error.code);
					deferred.resolve({'results':{'error': error.message, 'code': error.code}});
				}
			});
			return deferred.promise;
		};

		Database.prototype.logout = function(){
			Parse.User.logOut();
		};

		Database.prototype.updateUser = function(data){
			var currentUser = Parse.User.current();
			var loginreturnData = {
				'username': currentUser.attributes.username,
				"password": data.password,
			};
			var deferred = $q.defer();
			Database.prototype.login(loginreturnData).then(function(returnData){
	      if (!returnData.results.error) {
					currentUser.set("password", data.newpassword);
					currentUser.set("email", data.email);
				if(currentUser)
				{
					currentUser.save(null, {
						success: function(currentUser) {
							deferred.resolve({'results': currentUser});
						},
						error: function(currentUser, error) {
							handleParseError(error.code);
							deferred.resolve({'results':{'error': error.message, 'code': error.code}});
						}
					});
				}
        } else{
            deferred.resolve({'results':{'error': returnData.results.error, 'code': returnData.results.code}});
        }
      });
			return deferred.promise;
		};

		// REST

		Database.prototype.post = function(table_name, data){
			var table = new (Parse.Object.extend(table_name))();
			var deferred = $q.defer();
			Database.prototype.encodeQuery(data);
			table.save(data, {
				success: function(data) {
					var results = new Database();
					results.setPointerMapping(pointerMapping);
					deferred.resolve({'results': results.decodeData(results.stripObject(data))});
				},
				error: function(error) {
					handleParseError(error.code);
					deferred.resolve({'results':{'error': error.message, 'code': error.code}});
				}
			});
			return deferred.promise;
		};

		Database.prototype.get = function(table_name, params){
			Database.prototype.encodeQuery(params);
			var query = new Parse.Query(Parse.Object.extend(table_name));
			var deferred = $q.defer();

			var keys = Object.keys(params);
			for (var i = 0; i < keys.length; i++) {
				if (parseParams[keys[i]]) {
					query[parseParams[keys[i]]] = params[keys[i]];
				}
			}

			query.find({
				success: function(data) {
					var results = new Database();
					results.setPointerMapping(pointerMapping);
					deferred.resolve({'results': results.decodeData(results.stripArray(data))});
				},
				error: function(error) {
					handleParseError(error.code);
					deferred.resolve({'results':{'error': error.message, 'code': error.code}});
				}
			});
			return deferred.promise;
		};

		Database.prototype.put = function(table_name, objectId, data)
		{
			var deferred = $q.defer();
			console.log(data)
			var query = new Parse.Query(Parse.Object.extend(table_name));
			query.equalTo("objectId", objectId);
			query.first({
			  success: function(object) {
			  	var keys = Object.keys(data);
			  	if (object) {
			  		for (var i = 0; i < keys.length; i++) {
			  		object.set(keys[i], data[keys[i]]);
				  	}
				    var result = object.save();
				    result.then(function(){
				    	var results = new Database();
							results.setPointerMapping(pointerMapping);
				    	if (result._resolved) {
					    	deferred.resolve({'results': results.decodeData(results.stripArray(result._result))});
					    } else
					    {
					    	deferred.resolve({'results':{'error': "Failed to update"}});
					    }
				    });
			  	} else {
			  		deferred.resolve({'results':{'error': "This object does not exist", 'code': 404}});
			  	}
			  	
			  },
			  error: function(error) {
			  	handleParseError(error.code);
			    deferred.resolve({'results':{'error': error.message, 'code': error.code}});
			  }
			});
			return deferred.promise;
		};

		Database.prototype.delete = function(table_name, objectId)
		{
			var deferred = $q.defer();
			var query = new Parse.Query(Parse.Object.extend(table_name));
			query.equalTo("objectId", objectId);
			query.first({
			  success: function(object) {
			  	if (object) {
				  	object.destroy({
						  success: function(data) {
					    	deferred.resolve({'results': "Object " + data.id + " has been deleted"});
						  },
						  error: function(data, error) {
						  	handleParseError(error.code);
						    deferred.resolve({'results':{'error': error.message, 'code': error.code}});
						  }
						});
					} else {
						deferred.resolve({'results':{'error': "Object does not exist", 'code': 404}});
					}	
			  },
			  error: function(error) {
			    deferred.resolve({'results':{'error': error.message, 'code': error.code}});
			  }
			});
			return deferred.promise;
		};


		function handleParseError(err) {
			switch (err.code) {
				case Parse.Error.INVALID_SESSION_TOKEN:
					Parse.User.logOut();
					break;
			}
		}

	});

	