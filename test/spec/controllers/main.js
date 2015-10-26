'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angularParseApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  describe('test get', function () {

    it('test get all', function (done) {
      scope.init();

      scope.test_get_all().then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        done();
      });
    });

    it('test get an object with objectId', function (done) {
      scope.init();

      scope.test_get_an_object_with_objectId().then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBe(1);
        done();
      });
    });

    it('test_get_an_object_with_one_condition', function (done) {
      scope.init();

      scope.test_get_an_object_with_one_condition().then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        done();
      });
    });

    it('test_get_an_object_with_two_condition', function (done) {
      scope.init();

      scope.test_get_an_object_with_two_condition().then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        done();
      });
    });

    it('test_get_an_object_with_pointer_condition', function (done) {
      scope.init();

      scope.test_get_an_object_with_pointer_condition().then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        done();
      });
    });

  });
});
