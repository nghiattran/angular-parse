'use strict';

/**
 * @ngdoc function
 * @name angularParseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularParseApp
 */
angular.module('angularParseApp')
  .controller('MainCtrl', function (parseServices, $scope, $q, $rootScope, $timeout, JSONFormatterConfig) {

    $scope.$watch('request.json', function (str){
      var result = {};
      try {
          $scope.textareaJson = JSON.parse(str);
      } catch (e) {}
    });

    $scope.request = {
      json : '',
    }
    $scope.request.json = JSON.stringify({"where":{"objectId":"XuHh1HlZNq"}},null,"    ");

    parseServices.setKeysSimple("aNcLKlFlOSSlgFHdyelHlMLzgVxUB5MutK2Dsn4K", "zwCxqHYtqjjoubvqpoVhqkN5kczWcPUKwVI3vmMk");
    parseServices.setPointerMappingSimple({createdBy: '_User', onShelf: 'Shelves'});
    
    var is_json_string = function(str) {
      str = str.replace(/'/g,"\"");
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    var post_request = function(request)
    {
      parseServices.post(request.table,request.json).then(function(data){
        $scope.response = data;
      })
    }

    var get_request = function(request)
    {
      parseServices.get(request.table,request.json).then(function(data){
        $scope.response = data;
      })
    }

    var put_request = function(request)
    {
      parseServices.put(request.table, request.objectId,request.json).then(function(data){
        $scope.response = data;
      })
    }

    var delete_request = function(request)
    {
      parseServices.delete(request.table, request.objectId,request.json).then(function(data){
        $scope.response = data;
        // $scope.response = JSON.stringify(data,null,"    ")
      })
    }

    $scope.submit = function(request)
    {
      if (is_json_string(request.json)) {
        var tmp_request = {};
        var keys = Object.keys(request);

        for (var i = 0; i < keys.length; i++) {
          tmp_request[keys[i]] = request[keys[i]];
        };

        tmp_request.json = tmp_request.json.replace(/'/g,"\"");
        tmp_request.json = JSON.parse(tmp_request.json);
        
        if (tmp_request.method === 'GET') {
         get_request(tmp_request);
        } else  if (request.method === 'POST')
        {
          post_request(tmp_request);
        } else  if (tmp_request.method === 'PUT')
        {
          put_request(tmp_request);
        } else  if (tmp_request.method === 'DELETE')
        {
          delete_request(tmp_request);
        }
      }else{
        console.log("not json");
      }
    }

  });

