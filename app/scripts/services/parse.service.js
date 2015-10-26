
'use strict';
/** @ngInject */
angular
    .module('parseServies', [
  	])
	.service('parseServies', function Database($rootScope, $q, $http) 
	{	
		var dataType = ['string', 'pointer', 'time', 'bolean', 'number'];
		var parseParams = {include: "_include", limit: "_limit", skip: "_skip", where: "_where", keys: "_select", order: "_order"};
		var pointerMapping = {};

		// TODO reading all credentials from external files and make all functions wait
		// untill it finishes reading
		// Initialize database
		Database.prototype.init = function()
		{
			pointerMapping = {createdBy: '_User', onShelf: 'Shelves'};
			Parse.initialize("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
			// var defer = $q.defer();
			// this.setKeys().then(function(data){
			// 	if (data.error !== undefined) {
			// 		console.error(data.error.message);
			// 	};
			// 	
			// })
			// this.modelDatabase().then(function(data){
			// 	if (data.error !== undefined) {
			// 		console.error(data.error.message);
			// 	};

			// 	defer.resolve({results:{message: 'Successfully initialized', code: 202}});
			// })
			// return defer.promise;
		}

		// Modeling database and validate field
		Database.prototype.modelDatabase = function() {
			var defer = $q.defer();
			this.readDatabaseStruct().then(function(data){
				var tables = data[1];
				for (var table in tables) {
					for (var column in tables[table]) {
						if (dataType.indexOf(tables[table][column]) === -1 && dataType.indexOf(tables[table][column]['_type']) ===-1)
						{
							defer.resolve({error:{message: 'Invalid data type'}});
							return defer.promise;
						} else if (tables[table][column]['_type'] == 'pointer')
						{
							// Set mapping pointer
							pointerMapping[column] = tables[table][column]['to'];
						}
					};
				};
				Parse.initialize(data.applicationId, data.javascriptKey);
				defer.resolve({results:{message: 'Database contructed successfully', code: 202}});
			});
			return defer.promise;
		}

		// Read in database structure from dataStruct.json
		Database.prototype.readDatabaseStruct = function() {
	        var defer = $q.defer();
	        $http.get('dataStruct.json')
	            .success(function(data) {
	                defer.resolve(data);
	            })
	            .error(function() {
	                defer.reject('Could not find dataStruct.json');
	            });

	        return defer.promise;
	    }

	    // Read in keys from keys.json
		Database.prototype.readParseKeys = function() {
	        var defer = $q.defer();
	        $http.get('keys.json')
	            .success(function(data) {
	                defer.resolve(data);
	            })
	            .error(function() {
	                defer.reject('Could not find keys.json');
	            });

	        return defer.promise;
	    }

		// set Parse keys
		Database.prototype.setKeys = function(applicationId, javascriptKey){
			var defer = $q.defer();
			this.readParseKeys().then(function(data){
				if (data['applicationId'] === undefined || data['javascriptKey'] === undefined) {
					defer.resolve({error:{message: 'One or both keys for Parse are missing'}});
				} else {
					Parse.initialize(data.applicationId, data.javascriptKey);
					defer.resolve({results:{message: 'Successfully initialized', code: 202}});
				}
			})
			return defer.promise;
		};

		// set Parse keys simple
		Database.prototype.setKeysSimple = function(applicationId, javascriptKey){
			Parse.initialize(data.applicationId, data.javascriptKey);
		}

		// Mapping Pointer
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
			var defer = $q.defer();
			if (!data.username || !data.password) {
				defer.resolve({results:{error: 'Missing username or password', code: error.code}});
				return defer.promise;
			}
			var user = new Parse.User();
			user.set("username", data.username);
			user.set("password", data.password);
			user.set("email", data.email);
			user.signUp(null, {
			  success: function(data) {
			    var results = new Database();
					results.setPointerMapping(pointerMapping);
					defer.resolve({results: results.decodeData(results.stripObject(data))});
			  },
			  error: function(data, error) {
			  	handleParseError(error.code);
			    defer.resolve({results:{error: error.message, code: error.code}});
			  }
			});
			return defer.promise;
		};

		Database.prototype.login = function(data){
			var defer = $q.defer();
			Parse.User.logIn(data.username, data.password, {
				success: function(data) {
					var results = new Database();
					results.setPointerMapping(pointerMapping);
					defer.resolve({results: results.decodeData(results.stripObject(data))});
				},
				error: function(data, error) {
					handleParseError(error.code);
					defer.resolve({results:{error: error.message, code: error.code}});
				}
			});
			return defer.promise;
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
			var defer = $q.defer();
			Database.prototype.login(loginreturnData).then(function(returnData){
				if (!returnData.results.error) {
						currentUser.set("password", data.newpassword);
						currentUser.set("email", data.email);
					if(currentUser)
					{
						currentUser.save(null, {
							success: function(currentUser) {
								defer.resolve({results: currentUser});
							},
							error: function(currentUser, error) {
								handleParseError(error.code);
								defer.resolve({results:{error: error.message, code: error.code}});
							}
						});
					}
				} else{
					defer.resolve({results:{error: returnData.results.error, code: returnData.results.code}});
				}
      		});
			return defer.promise;
		};

		// REST

		Database.prototype.post = function(table_name, data){
			var table = new (Parse.Object.extend(table_name))();
			var defer = $q.defer();
			Database.prototype.encodeQuery(data);
			table.save(data, {
				success: function(data) {
					var results = new Database();
					results.setPointerMapping(pointerMapping);
					defer.resolve({results: results.decodeData(results.stripObject(data))});
					$rootScope.$apply();
				},
				error: function(error) {
					handleParseError(error.code);
					defer.resolve({results:{error: error.message, code: error.code}});
					$rootScope.$apply();
				}
			});
			return defer.promise;
		    
		};

		Database.prototype.get = function(table_name, params){
			Database.prototype.encodeQuery(params);
			var query = new Parse.Query(Parse.Object.extend(table_name));
			var defer = $q.defer();

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
					defer.resolve({results: results.decodeData(results.stripArray(data))});
					$rootScope.$apply();
				},
				error: function(error) {
					handleParseError(error.code);
					defer.resolve({results:{error: error.message, code: error.code}});
					$rootScope.$apply();
				}
			});
			return defer.promise;
		};

		Database.prototype.put = function(table_name, objectId, data)
		{
			var defer = $q.defer();
			var query = new Parse.Query(Parse.Object.extend(table_name));
			Database.prototype.encodeQuery(data);
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
					    	defer.resolve({results: results.decodeData(results.stripArray(result._result))});
					    	$rootScope.$apply();
					    } else
					    {
					    	defer.resolve({results:{error: "Failed to update"}});
					    	$rootScope.$apply();
					    }
				    });
			  	} else {
			  		defer.resolve({results:{error: "This object does not exist", code: 404}});
			  		$rootScope.$apply();
			  	}
			  	
			  },
			  error: function(error) {
			  	handleParseError(error.code);
			    defer.resolve({results:{error: error.message, code: error.code}});
			  	$rootScope.$apply();
			  }
			});
			return defer.promise;
		};

		Database.prototype.delete = function(table_name, objectId)
		{
			var defer = $q.defer();
			var query = new Parse.Query(Parse.Object.extend(table_name));
			query.equalTo("objectId", objectId);
			query.first({
			  success: function(object) {
			  	if (object) {
				  	object.destroy({
						  success: function(data) {
						  	defer.resolve({results:{error: "Object " + data.id + " has been deleted", code: 200}});
						  	$rootScope.$apply();
						  },
						  error: function(data, error) {
						  	handleParseError(error.code);
						    defer.resolve({results:{error: error.message, code: error.code}});
						  	$rootScope.$apply();
						  }
						});
					} else {
						defer.resolve({results:{error: "Object does not exist", code: 404}});
						$rootScope.$apply();
					}	
			  },
			  error: function(error) {
			    defer.resolve({results:{error: error.message, code: error.code}});
			  	$rootScope.$apply();
			  }
			});
			return defer.promise;
		};

		function handleParseError(err) {
			switch (err.code) {
				case Parse.Error.INVALID_SESSION_TOKEN:
					Parse.User.logOut();
					break;
			}
		}

		// function checkFlag(param) {
		//     if($rootScope.is_initialized == false) {
		//         window.setTimeout(checkFlag, 1); /* this checks the flag every 100 milliseconds*/
		//     } else {
		//     	console.log("hello")
		//     }
		// }


		// Database.prototype.request = function(method, table_name, data, objectId)
		// {
		// 	if ($rootScope.is_initialized == false) {
		// 		this.init
		// 	};
		// }
	});

	