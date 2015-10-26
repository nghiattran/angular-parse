'use strict';

/**
 * @ngdoc overview
 * @name angularParseApp
 * @description
 * # angularParseApp
 *
 * Main module of the application.
 */
// angular
//   .module('angularParseApp', [
//     'parseServies'
//     ]);

/* global angular */
'use strict';

angular
    .module('angularParseApp', ['parseServies'])
    .factory('AsyncService', function($q, $timeout, $http) {

        return {
            resolveAsync: resolveAsync,
            rejectAsync: rejectAsync,
            resolveAfterHttpCall: resolveAfterHttpCall
        };

        function resolveAsync() {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve('response');
            }, 1000);
            return deferred.promise;
        }

        function rejectAsync() {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.reject('rejection');
            }, 1000);
            return deferred.promise;
        }

        function resolveAfterHttpCall(){
            return $http.get('www.google.com')
                .then(function(response){
                    return $q(function(resolve){
                        $timeout(function(){
                            resolve(response.data);
                        }, 1000);
                    });
                });
        }

    });