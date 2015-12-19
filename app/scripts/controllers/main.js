'use strict';

/**
 * @ngdoc function
 * @name angularParseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularParseApp
 */
angular.module('angularParseApp')
  .controller('MainCtrl', function (angularParse) {

  	angularParse.setBaseUrl('http://localhost:8000/api/');

  	// var params = {where:{no: 'no'}};
   //  angularParse.get('users', 'UeKVreT4pk').then(function(response)
   //  {
   //  	console.log(response);
   //  })

  	// var data = {email: 'nghiattran@gmail.com'};
	// angularParse.signup(data).then(function(response)
	// {
	// 	console.log(response);
	// })

	// angularParse.resetPassword(data).then(function(response)
	// {
	// 	console.log(response);
	// })
  	// angularParse.delete('users', '1VOKYRUhCB', data).then(function(response)
   //  {
   //  	console.log(response);
   //  })
  });
