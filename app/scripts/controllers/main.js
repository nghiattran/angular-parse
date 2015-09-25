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

  parseServies.setKeys("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
  parseServies.setPointerMapping({createdBy: '_User', onShelf: 'Shelves'});
  
  // var where = {createdBy: 'RYpc5azQhS'};
  // var params = { 
  //   where: where,
  //   // include: ['createdBy'],
  //   // limit: 5
  // }
  // parseServies.get('Shelvesss', params).then(function(data){
  //   if (!data.results.error) {
  //     // $scope.shelves = data.results;
  //     console.log(data.results);
  //     // $scope.getBooks();
  //   } else{

  //   }
  // })

  // var shelf = {
  //   'name': 'test',
  //   'createdBy': "wow"
  // }

  // parseServies.post('Shelvess',shelf).then(function(data){
  //   if (!data.results.error) {
  //     console.log(data.results);
  //     console.log(typeof data.results.createdBy)
  //   } else{
  //     console.log(data.results.error);
  //     $scope.login_error = 'Your username or password is incorrect';
  //   }
  // })
  
  var data = {
    'name': 'has changed',
  }
  parseServies.put('Shelves', 'HmHH5c1T6H', data).then(function(data){
    if (!data.results.error) {
      console.log(data.results);
    } else{
      console.log(data.results.error);
      $scope.login_error = 'Your username or password is incorrect';
    }
  })

});
