'use strict';

/**
 * @ngdoc function
 * @name angularParseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularParseApp
 */
angular.module('angularParseApp')
  .directive("fileread", [function () {
      return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
              scope.$apply(function () {
                  // scope.fileread = changeEvent.target.files[0];
                  // or all selected files:
                  scope.fileread = changeEvent.target.files;
              });
            });
        }
      }
  }])
  .controller('MainCtrl', function (parseServies, $scope, $q, $rootScope, $timeout) {
    // parseServies.init();
  // parseServies.setKeys("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
  // parseServies.setPointerMappingSimple({createdBy: '_User', onShelf: 'Shelves'});
  
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
    var payload = {
      file: data.file || null,
      name: data.name,
    }
    parseServies.post('File',payload).then(function(data){
      if (!data.results.error) {
        console.log(data.results);
      } else{
        console.log(data.results.error);
        $scope.login_error = 'Your username or password is incorrect';
      }
    })
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

  $scope.test_get =  function(table_name, params)
  {
    var defer = $q.defer();
    parseServies.get(table_name, params).then(function(data)
    {
      defer.resolve(data);
      // console.log(data.results)
    })
    return defer.promise;
  }

  $scope.test_post =  function(table_name, payload)
  {
    var defer = $q.defer();
    parseServies.post(table_name,payload).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_put =  function(table_name, objectId, payload)
  {
    var defer = $q.defer();
    parseServies.put(table_name, objectId,payload).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_delete =  function(table_name, objectId, payload)
  {
    var defer = $q.defer();
    parseServies.delete(table_name, objectId).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_signup =  function(credentials)
  {
    var defer = $q.defer();
    parseServies.signup(credentials).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_login =  function(credentials)
  {
    var defer = $q.defer();
    parseServies.login(credentials).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_update_user =  function(credentials)
  {
    var defer = $q.defer();
    parseServies.updateUser(credentials).then(function(data){
      defer.resolve(data);
    })
    return defer.promise;
  }

  $scope.test_current_user =  function(credentials)
  {
    return parseServies.getCurrentUser();
  }

  $scope.logout =  function(credentials)
  {
    parseServies.logout();
  }

  // $scope.test_signup(username1 , 2);

  $scope.init = function()
  {
    parseServies.init();
  }

  var params = {
    where: {
      order: {"$gte": 3}
      // objectId: "5iRU3a50cb"
      // objectId: "2DejK1qDZX"
      // name: "test function",
      // createdBy: "PNteddARfT"
    },
    // select: ["name"]
    // include: ["onShelf"]
    // include: ["createdBy", "createdAt"]
  };

  var credentials = {
    username: "one",
    password: "haibabon"
  }
  
  $scope.test = function(redentials)
  {
    var fileUploadControl = redentials.files;
    for (var i = 0; i < redentials.files.length; i++) {
      var parseFile = new Parse.File(name, fileUploadControl);
    };
    
  }
  


  // $scope.init();
  // $scope.test_login(credentials);
  // console.log(parseServies.getCurrentUser());
  // $scope.logout();
  // $scope.test_signup(credentials);
  // $scope.test_get("Shelves", params);
  // $scope.test_delete("Shelves", "npMx7WWfsV");
  // $scope.test_put("Shelves", "eswtUkIRpx", payload);
  // delete payload.createdBy;
  // $scope.test_put("Shelves", "eswtUkIRpx", payload);
});

