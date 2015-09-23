'use strict';

/**
 * @ngdoc function
 * @name angularParseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularParseApp
 */
angular.module('angularParseApp')
  .controller('MainCtrl', function (parseServies) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  // $lt Less Than
  // $lte  Less Than Or Equal To
  // $gt Greater Than
  // $gte  Greater Than Or Equal To
  // $ne Not Equal To
  // $in Contained In
  // $nin  Not Contained in
  // $exists A value is set for the key

  parseServies.setKeys("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
  parseServies.setPointer({createdBy: '_User', owner: 'Profile'});
  
  var params = {'createdBy': "PNteddARfT"};
    parseServies.get('Shelves', params).then(function(data){
      if (!data.results.error) {
        // $scope.shelves = data.results;
        console.log(data.results);
        // $scope.getBooks();
      } else{

      }
    })

  // var shelf = {
  //   'name': 'test',
  //   'createdBy': parseServies.encodePointer('_User', "PNteddARfT")
  // }

  // parseServies.post('Shelves',shelf).then(function(data){
  //   if (!data.results.error) {
  //     console.log(data.results);
  //     console.log(typeof data.results.createdBy)
  //   } else{
  //     console.log(data.results.error);
  //     $scope.login_error = 'Your username or password is incorrect';
  //   }
  // })

  });
