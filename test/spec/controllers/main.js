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

  var table_name = "Shelves";
  var created_by = "PNteddARfT";
  describe('test get', function () {

    it('test get all', function (done) {
      scope.init();
      var params = {where: {}};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        done();
      });
    });

    it('test get an object with objectId', function (done) {
      scope.init();
      var params = {where: {
        objectId: "BXcIz3z3Ta"
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBe(1);
        done();
      });
    });

    it('test_get_with_limit', function (done) {
      scope.init();
      var params = {
        limit : 10,
        where: {}
      };
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBe(params.limit);
        done();
      });
    });

    it('test_get_with_one_condition', function (done) {
      scope.init();
      var params = {where: {
        name: "test"
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        done();
      });
    });

    it('test_get_with_two_conditions', function (done) {
      scope.init();
      var params = {where: {
        name: "test",
        createdBy: created_by
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        done();
      });
    });

    it('test_get_with_pointer_condition', function (done) {
      scope.init();
      var params = {where: {
        createdBy: created_by
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        done();
      });
    });

    it('test get with nonexist condition', function (done) {
      scope.init();
      var params = {where: {
        createdBys: created_by
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBe(0);
        done();
      });
    });
  });

  describe('test post', function () {

    it('test post', function (done) {
      scope.init();
      var payload = {
        name: "test funtion"
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.name).toBe(payload.name);
        done();
      });
    });

    it('test post', function (done) {
      scope.init();
      var payload = {
        name: "test funtion"
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.name).toBe(payload.name);
        done();
      });
    });

    it('test post with pointer', function (done) {
      scope.init();
      var payload = {
        name: "test funtion",
        createdBy: created_by
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.name).toBe(payload.name);
        done();
      });
    });

    it('test post nonexist column', function (done) {
      scope.init();
      var payload = {
        name: "test funtion",
        s_name: "test funtion"
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.name).toBe(payload.name);
        done();
      });
    });



  });
});
