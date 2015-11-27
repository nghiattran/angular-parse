'use strict';

/**
 * @ngdoc function
 * @name angularParseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularParseApp
 */
angular.module('angularParseApp')
  .controller('TestCtrl', function (parseServices, $scope, $q, $rootScope, $timeout) {
    // parseServices.init();
  // parseServices.setKeys("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
  // parseServices.setPointerMappingSimple({createdBy: '_User', onShelf: 'Shelves'});
  
  // var where = {createdBy: 'RYpc5azQhS'};
  // var params = { 
  //   where: where,
  //   // include: ['createdBy'],
  //   // limit: 5
  // }
  // parseServices.get('Shelvesss', params).then(function(data){
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

  // parseServices.post('Shelvess',shelf).then(function(data){
  //   if (!data.results.error) {
  //     console.log(data.results);
  //     console.log(typeof data.results.createdBy)
  //   } else{
  //     console.log(data.results.error);
  //     $scope.login_error = 'Your username or password is incorrect';
  //   }
  // })
  
  $scope.post = function(data)
  {
    var payload = {
      file: data.file || null,
      name: data.name,
    }
    parseServices.post('File',payload).then(function(data){
      if (!data.results.error) {
        console.log(data.results);
      } else{
        console.log(data.results.error);
        $scope.login_error = 'Your username or password is incorrect';
      }
    })
  }

  $scope.test_get =  function(table_name, params)
  {
    var defer = $q.defer();
    parseServices.get(table_name, params).then(function(data)
    {
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_post =  function(table_name, payload)
  {
    var defer = $q.defer();
    parseServices.post(table_name,payload).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_put =  function(table_name, objectId, payload)
  {
    var defer = $q.defer();
    parseServices.put(table_name, objectId,payload).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_delete =  function(table_name, objectId, payload)
  {
    var defer = $q.defer();
    parseServices.delete(table_name, objectId).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_signup =  function(credentials)
  {
    var defer = $q.defer();
    parseServices.signup(credentials).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_login =  function(credentials)
  {
    var defer = $q.defer();
    parseServices.login(credentials).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_update_user =  function(credentials)
  {
    var defer = $q.defer();
    parseServices.updateUser(credentials).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_current_user =  function(credentials)
  {
    return parseServices.getCurrentUser();
  }

  $scope.test_file = function(file)
  {
    var defer = $q.defer();
    parseServices.uploadFile(file).then(function(data) {
      defer.resolve(data);

    })
    return defer.promise;
  }

  $scope.logout =  function(credentials)
  {
    parseServices.logout();
  }

  $scope.init = function()
  {
    parseServices.setKeysSimple("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
    parseServices.setPointerMappingSimple({createdBy: '_User', onShelf: 'Shelves'});
  }
  
  $scope.test = function(redentials)
  {
    var fileUploadControl = redentials.files;
    parseServices.uploadFile(fileUploadControl).then(function(data) {
      var payload = {
        file: data.results,
        name: "test upload file"
      }
      parseServices.post("Shelves", payload).then(function(data) {
        console.log(data);
      })
    })
  }
  
  $scope.init();
});

