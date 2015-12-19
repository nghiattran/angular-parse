'use strict';
/** @ngInject */
angular
    .module('angularParse', [
    	'LocalStorageModule'
  	])
	.service('angularParse', function service($rootScope, $q, $http, localStorageService) 
	{	
		var baseUrl;

		this.setBaseUrl = function(url)
		{
			baseUrl = url;
		};

		this.setUrl = function(url)
		{
			return baseUrl.concat(url);
		};

		this.gets = function(url, params)
		{
			var config ={
			    headers: {Authorization: this.getCookie()},
			    params: params
			};

			var deferred = $q.defer();
			$http.get(this.setUrl(url), config).then(
				function(response){
					deferred.resolve(response.data);
				}, 
				function(response){
					deferred.reject(response.data);
				}
			);
			return deferred.promise;
		};

		this.get = function(url, objectId)
		{
			var config ={
			    headers: {Authorization: this.getCookie()},
			};

			var deferred = $q.defer();
			$http.get(this.setUrl(url) + '/' + objectId, config).then(
				function(response){
					deferred.resolve(response.data);
				}, 
				function(response){
					deferred.reject(response.data);
				}
			);
			return deferred.promise;
		};

		this.post = function(url, data)
		{
			var config ={
			    headers: {Authorization: this.getCookie()},
			};
			var deferred = $q.defer();
			$http.post(this.setUrl(url), data, config).then(
				function(response){
					deferred.resolve(response.data);
				}, 
				function(response){
					deferred.reject(response.data);
				}
			);
			return deferred.promise;
		};

		this.put = function(url, objectId, data)
		{
			var config ={
			    headers: {Authorization: this.getCookie()},
			};
			var deferred = $q.defer();
			$http.put(this.setUrl(url) + '/' + objectId, data, config).then(
				function(response){
					deferred.resolve(response.data);
				}, 
				function(response){
					deferred.reject(response.data);
				}
			);
			return deferred.promise;
		};

		this.delete = function(url, objectId)
		{
			var config ={
			    headers: {Authorization: this.getCookie()},
			};
			var deferred = $q.defer();
			$http.delete(this.setUrl(url) + '/' + objectId, config).then(
				function(response){
					deferred.resolve(response.data);
				}, 
				function(response){
					deferred.reject(response.data);
				}
			);
			return deferred.promise;
		};


		this.signup = function(credentials)
		{
			var config ={
			    headers: {Authorization: this.getCookie()},
			};

			var deferred = $q.defer();
			$http.post(baseUrl + 'signup', credentials, config).then(
				function(response){
					if (response.data.error === undefined) {
						this.createCookie(response.data.token);
					}
					deferred.resolve(response.data);
				}, 
				function(response){
					deferred.reject(response.data);
				}
			);
			return deferred.promise;
		};

		this.login = function(credentials)
		{
			var config ={
			    headers: {Authorization: this.getCookie()},
			    params: credentials
			};

			var deferred = $q.defer();
			$http.get(baseUrl + 'login', config).then(
				function(response){
					if (response.data.error === undefined) {
						this.createCookie(response.data.token);
					}
					deferred.resolve(response.data);
				}, 
				function(response){
					deferred.reject(response.data);
				}
			);
			return deferred.promise;
		};

		this.logout = function()
		{
			this.clearCookie();
		};

		this.resetPassword = function(credentials)
		{
			var config ={
			    headers: {Authorization: this.getCookie()},
			};

			var deferred = $q.defer();
			$http.post(baseUrl + 'resetpassword',credentials, config).then(
				function(response){
					deferred.resolve(response.data);
				}, 
				function(response){
					deferred.reject(response.data);
				}
			);
			return deferred.promise;
		};

		this.createCookie = function (token) {
			return localStorageService.cookie.set('Authorization', token);
	    };

	    this.getCookie = function () {
			return localStorageService.cookie.get('Authorization');
	    };

	    this.clearCookie = function(){
	    	return localStorageService.cookie.clearAll();
	    };
	});
