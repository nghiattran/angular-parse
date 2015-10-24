'use strict';

/**
 * @ngdoc function
 * @name angularParseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularParseApp
 */
angular.module('angularParseApp')
  .controller('MainCtrl', function (parseServies, $scope) {
    parseServies.init();
  // parseServies.setKeys("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
  // parseServies.setPointerMapping({createdBy: '_User', onShelf: 'Shelves'});
  
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
  
  $scope.on_click = function(data)
  {
    // var shelf = {
    //   'name': 'test',
    //   'createdBy': "wow"
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

    // console.log("clicked");
    // var data = {
    //   'name': 'changed back',
    // }
    // parseServies.put('Shelves', 'vCRrfgzT4r', data).then(function(data){
    //   if (!data.results.error) {
    //     console.log(data.results);
    //   } else{
    //     console.log(data.results.error);
    //     $scope.login_error = 'Your username or password is incorrect';
    //   }
    // })
  }


  // var data = {
  //   'name': 'has changed to something else',
  // }
  // parseServies.put('Shelves', 'vCRrfgzT4r', data).then(function(data){
  //   if (!data.results.error) {
  //     console.log(data.results);
  //   } else{
  //     console.log(data.results.error);
  //     $scope.login_error = 'Your username or password is incorrect';
  //   }
  // })

  $scope.post = function(data)
  {
    // var payload = {
    //   file: data.file || null,
    //   name: data.name,
    // }
    // parseServies.post('File',payload).then(function(data){
    //   if (!data.results.error) {
    //     console.log(data.results);
    //   } else{
    //     console.log(data.results.error);
    //     $scope.login_error = 'Your username or password is incorrect';
    //   }
    // })
  }

  // parseServies.modelDatabase().then(function(data){
  //   console.log(data);
    // if (!data.results.error) {
    //   console.log(data.results);
    // } else{
    //   console.log(data.results.error);
    //   $scope.login_error = 'Your username or password is incorrect';
    // }
  // })

  // parseServies.modelDatabase()
});

