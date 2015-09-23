
'use strict';

angular
    .module('parseServies', [
  	])
  .service('parseServies', database);

	/** @ngInject */
	
	function database($rootScope, $q) 
	{
		
		var parseParams = {include: "_include", limit: "_limit", skip: "_skip", where: "_where", keys: "_select", order: "_order"}
		// var Pointer = {createdBy: '_User', owner: 'Profile', onShelf: 'Shelves'};
		var pointerMapping;

		// set Parse keys
		this.setKeys = function(applicationId, javascriptKey){
			Parse.initialize(applicationId, javascriptKey);
		}

		// Set mapping Pointer
		this.setPointerMapping = function(setting){
			pointerMapping = setting;
		}

		// Encode parse pointer from objectId to {__type: "Pointer", className: table, objectId: objectId}
		this.encodeQuery = function(query){
			var keys = Object.keys(query);
			for (var i = 0; i < keys.length; i++) 
			{
				if (pointerMapping[keys[i]]) {
					query[keys[i]] = {
					  __type: "Pointer",
		        className: pointerMapping[keys[i]],
		        objectId: query[keys[i]]
			    };
				};

				if (typeof(query[keys[i]]) === 'object') {
					this.encodeQuery(query[keys[i]]);
				};
			}
			return query
		};

		// Decode parse pointer from object type to a string of objectId only
		this.decodeData = function(query){
			var keys = {};
			if (typeof(query) === 'object' && query != null) {
				keys = Object.keys(query);
			}
			for (var i = 0; i < keys.length; i++) 
			{
				if (pointerMapping[keys[i]]) {
					query[keys[i]] = query[keys[i]].objectId
				};
				if (typeof(query[keys[i]]) === 'object') {
					this.decodeData(query[keys[i]]);
				};
			}
			return query
		};

		// TODO: these two functions are not well written
		// Strip down array of results to remove unnecessary data
		this.stripArray = function(data){
			var objects = [];
			var keys = [];
			for (var x = 0; x < data.length; x++) {
				var object = {};
				keys[x] = Object.keys(data[x].attributes);
				object.objectId = data[x].id;
				for (var y = 0; y < keys[x].length; y++) {
					if (data[x].attributes[keys[x][y]].attributes) {
						object[keys[x][y]] = this.stripObject(data[x].attributes[keys[x][y]]);
					} else {
						object[keys[x][y]] = data[x].attributes[keys[x][y]];
					}
				}
				objects.push(object);
			}
			return objects;
		};

		this.stripObject = function(data){
			var object = {};
			var keys = Object.keys(data.attributes);
			object.objectId = data.id;
			for (var i = 0; i < keys.length; i++) {
				object[keys[i]] = data.attributes[keys[i]];
				if (data.attributes[keys[i]].attributes) {
					object[keys[i]] = this.stripObject(data.attributes[keys[i]]);
				} else {
					object[keys[i]] = data.attributes[keys[i]];
				}
			}
			return object;
		};

		// Users
		this.signup = function(data){
			var user = new Parse.User();
			user.set("username", data.username);
			user.set("password", data.password);
			user.set("email", data.email);

			var deferred = $q.defer();
			user.signUp(null, {
			  success: function(user) {
			    LocalStorage.setUser();
			    deferred.resolve({'results': user});
			  },
			  error: function(user, error) {
			    deferred.resolve({'results':{'error': error.message, 'code': error.code}});
			  }
			});
			return deferred.promise;
		};

		this.login = function(data){
			var deferred = $q.defer();
			Parse.User.logIn(data.username, data.password, {
				success: function(user) {
					LocalStorage.setUser();
					deferred.resolve({'results': user});
				},
				error: function(user, error) {
					deferred.resolve({'results':{'error': error.message, 'code': error.code}});
				}
			});
			return deferred.promise;
		};

		this.logout = function(){
			Parse.User.logOut();
			LocalStorage.setUser();
		};

		this.updateUser = function(data){
			var currentUser = Parse.User.current();
			var loginreturnData = {
				'username': currentUser.attributes.username,
				"password": data.password,
			};
			var deferred = $q.defer();
			this.login(loginreturnData).then(function(returnData){
	            if (!returnData.results.error) {
					currentUser.set("password", data.newpassword);
					currentUser.set("email", data.email);
					if(currentUser)
					{
						currentUser.save(null, {
							success: function(currentUser) {
								LocalStorage.setUser();
								deferred.resolve({'results': currentUser});
							},
							error: function(currentUser, error) {
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

		this.post = function(table_name, data){
			var table = new (Parse.Object.extend(table_name))();
			var deferred = $q.defer();
			this.encodeQuery(data);
			table.save(data, {
				success: function(data) {
					var results = new database();
					results.setPointerMapping(pointerMapping);
					deferred.resolve({'results': results.decodeData(results.stripObject(data))});
				},
				error: function(error) {
					deferred.resolve({'results':{'error': error.message, 'code': error.code}});
				}
			});
			return deferred.promise;
		};

		this.get = function(table_name, params){
			this.encodeQuery(params);
			var query = new Parse.Query(Parse.Object.extend(table_name));
			var deferred = $q.defer();

			var keys = Object.keys(params);
			for (var i = 0; i < keys.length; i++) {
				if (parseParams[keys[i]]) {
					query[parseParams[keys[i]]] = params[keys[i]];
				};
			};

			query.find({
				success: function(data) {
					var results = new database();
					results.setPointerMapping(pointerMapping);
					deferred.resolve({'results': results.decodeData(results.stripArray(data))});
				},
				error: function(error) {
					deferred.resolve({'results':{'error': error.message, 'code': error.code}});
				}
			});
			return deferred.promise;
		};
	}