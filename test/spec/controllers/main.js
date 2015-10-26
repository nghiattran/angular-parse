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

  var objects = null;
  var table_name = "Shelves";
  var created_by = "PNteddARfT";
  var created_by_put = "XbJTghT834";

  describe('test get', function () {

    it('test get all', function (done) {
      scope.init();
      var params = {where: {}};
      scope.test_get(table_name, params).then(function (response) {
        objects = response.results;
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

    it('test get with bolean', function (done) {
      scope.init();
      var params = {where: {
        bolean: true
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
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

    it('test post with bolean', function (done) {
      scope.init();
      var payload = {
        bolean: true
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.bolean).toBe(payload.bolean);
        done();
      });
    });

  });

  describe('test put', function () {

    it('test put simple', function (done) {
      scope.init();
      var payload = {
        name: "test put"
      }
      scope.test_put(table_name, objects[0].objectId, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results[0].name).toBe(payload.name);
       done();
      });
    });

    it('test put with pointer', function (done) {
      scope.init();
      var payload = {
        name: "test put with pointer",
        createdBy: created_by_put
      }
      scope.test_put(table_name, objects[1].objectId, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results[0].name).toBe(payload.name);
        expect(response.results[0].created_by).toBe(payload.created_by_put);
       done();
      });
    });

    it('test put with bolean', function (done) {
      scope.init();
      var payload = {
        name: "test put with bolean",
        bolean: true
      }
      scope.test_put(table_name, objects[1].objectId, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results[0].name).toBe(payload.name);
        expect(response.results[0].created_by).toBe(payload.created_by_put);
       done();
      });
    });

    it('test put with nonexist object', function (done) {
      scope.init();
      var payload = {
        name: "test put with bolean",
        bolean: true
      }
      scope.test_put(table_name, "something", payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.error).toBeDefined();
       done();
      });
    });
  });

  describe('test delete', function () {

    it('test detele simple', function (done) {
      scope.init();
      var payload = {
        name: "test put"
      }
      scope.test_delete(table_name, objects[2].objectId).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.code).toBe(200);
       done();
      });
    });

    it('test detele nonexist object', function (done) {
      scope.init();
      var payload = {
        name: "test put"
      }
      scope.test_delete(table_name," objects[2].objectId").then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.error).toBeDefined();
        expect(response.results.code).toBe(404);
       done();
      });
    });

  });
});
