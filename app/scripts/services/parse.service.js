
'use strict';

angular
    .module('parseServies', [
  	])
  .service('parseServies', database);

	/** @ngInject */
	
	function database($rootScope, $q) 
	{
		// Parse keys
		// Parse.initialize("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
		// var Pointer = {createdBy: '_User', owner: 'Profile'};
		var Pointer = {};

		this.setKeys = function(applicationId, javascriptKey){
			Parse.initialize(applicationId, javascriptKey);
		}

		this.setPointer = function(setting){
			Pointer = setting;
			console.log(setting);
		}

		// TODO: these two functions are not well written
		this.trimpArray = function(data){
			var objects = [];
			var keys = [];
			for (var x = 0; x < data.length; x++) {
				var object = {};
				keys[x] = Object.keys(data[x].attributes);
				object.objectId = data[x].id;
				for (var y = 0; y < keys[x].length; y++) {
					if (data[x].attributes[keys[x][y]].attributes) {
						object[keys[x][y]] = this.trimpObject(data[x].attributes[keys[x][y]]);
					} else {
						object[keys[x][y]] = data[x].attributes[keys[x][y]];
					}
				}
				objects.push(object);
			}
			return objects;
		};

		this.trimpObject = function(data){
			var object = {};
			var keys = Object.keys(data.attributes);
			object.objectId = data.id;
			for (var i = 0; i < keys.length; i++) {
				object[keys[i]] = data.attributes[keys[i]];
				if (data.attributes[keys[i]].attributes) {
					object[keys[i]] = this.trimpObject(data.attributes[keys[i]]);
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
			// var table = new table();
			var deferred = $q.defer();
			table.save(data, {
				success: function(returnData) {
					console.log(returnData)
					deferred.resolve({'results': returnData.attributes});
				},
				error: function(returnData, error) {
					deferred.resolve({'results':{'error': error.message, 'code': error.code}});
				}
			});
			return deferred.promise;
		};

		this.get = function(table_name, data){
			this.encodeQuery(data);
			var query = new Parse.Query(Parse.Object.extend(table_name));
			var keys = Object.keys(data);
			var deferred = $q.defer();
			for (var i = 0; i < keys.length; i++) {
				query.equalTo(keys[i], data[keys[i]]);
			}
			query.find({
				success: function(results) {
					var objects = [];
					var object = new database();
					objects = object.trimpArray(results);
					objects = object.decodeJSON(objects);
					deferred.resolve({'results': objects});
				},
				error: function(error) {
					deferred.resolve({'results':{'error': error.message, 'code': error.code}});
				}
			});
			return deferred.promise;
		};

		this.encodeQuery = function(query){
			var keys = Object.keys(query);
			for (var i = 0; i < keys.length; i++) 
			{
				if (Pointer[keys[i]]) {
					query[keys[i]] = this.encodePointer(Pointer[keys[i]], query[keys[i]]);
				};

				if (typeof(query[keys[i]]) === 'object') {
					this.encodeQuery(query[keys[i]]);
				};
			}
			return query
		};

		this.decodeJSON = function(query){
			var keys = {};
			if (typeof(query) === 'object' && query != null) {
				keys = Object.keys(query);
			}
			for (var i = 0; i < keys.length; i++) 
			{
				if (Pointer[keys[i]]) {
					query[keys[i]] = query[keys[i]].objectId
				};

				if (typeof(query[keys[i]]) === 'object') {
					this.decodeJSON(query[keys[i]]);
				};
			}
			return query
		};

		this.encodePointer = function(table, objectId){
			var pointer = {
        __type: "Pointer",
        className: table,
        objectId: objectId
	    };
	    return pointer;
		};
	}