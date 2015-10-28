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
  var users = null;
  var table_name = "Shelves";
  var created_by = "PNteddARfT";
  var created_by_put = "XbJTghT834";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  describe('test get', function () {

    it('test get all user', function (done) {
      scope.init();
      scope.logout();
      var params = {where: {}};
      scope.test_get("_User", params).then(function (response) {
        users = response.results;
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test get all', function (done) {
      scope.init();
      var params = {where: {}};
      scope.test_get(table_name, params).then(function (response) {
        objects = response.results;
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test get an object with objectId', function (done) {
      scope.init();
      var params = {where: {
        objectId: objects[0].objectId
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBe(1);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test get with limit', function (done) {
      scope.init();
      var params = {
        limit : 10,
        where: {}
      };
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBe(params.limit);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test get with include', function (done) {
      scope.init();
      var params = {
        where: {
          objectId: "2DejK1qDZX"
        },
        include: ["onShelf"]
      };
      scope.test_get("Books", params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results[0].onShelf.createdBy).toBeDefined();
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test get with greater than field', function (done) {
      scope.init();
      var params = {
        where: {
          order: {"$gt": 3}
        },
        limit: 50,
        include: ["onShelf"]
      };
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        expect(response.code).toBe(200);
        for (var i = 0; i < response.results.length; i++) {
          expect(response.results[i].order).toBeGreaterThan(3);
        };
        done();
      });
    });

    it('test get with not equal to field', function (done) {
      scope.init();
      var params = {
        where: {
          boolean: {"$ne": true}
        },
        include: ["onShelf"]
      };
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        for (var i = 0; i < response.results.length; i++) {
          expect(response.results[i].boolean).not.toBe(true);
        };
        expect(response.code).toBe(200);
        done();
      });
    });

    // TODO: investigate what's wrong with select
    // it('test get with select', function (done) {
    //   scope.init();
    //   var params = {
    //     where: {
    //     },
    //     select: ["name"]
    //   };

    //   scope.test_get(table_name, params).then(function (response) {
    //     console.log(response.results[0].createdBy)
    //     expect(response.results).toBeDefined();
    //     // expect(response.results[0].createdBy).toBeDefined();
    //     // expect(response.results[0].name).not.toBeDefined();
    //     // expect(response.results[0].bolean).not.toBeDefined();
    //     expect(response.code).toBe(200);
    //     done();
    //   });
    // });

    it('test_get_with_one_condition', function (done) {
      scope.init();
      var params = {where: {
        name: "test function"
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test_get_with_two_conditions', function (done) {
      scope.init();
      var params = {where: {
        name: "test function",
        createdBy: created_by
      }};
      scope.test_get(table_name, params).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.length).toBeGreaterThan(0);
        expect(response.code).toBe(200);
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
        expect(response.results[0].createdBy.objectId).toBeDefined();
        expect(response.code).toBe(200);
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
        expect(response.code).toBe(200);
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
        expect(response.code).toBe(200);
        done();
      });
    });
  });

  describe('test post', function () {

    it('test post', function (done) {
      scope.init();
      var payload = {
        name: "test function"
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.name).toBe(payload.name);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test post', function (done) {
      scope.init();
      var payload = {
        name: "test function"
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.name).toBe(payload.name);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test post with pointer', function (done) {
      scope.init();
      var payload = {
        name: "test function",
        createdBy: created_by
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.name).toBe(payload.name);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test post nonexist column', function (done) {
      scope.init();
      var payload = {
        name: "test function",
        s_name: "test function"
      }

      scope.test_post(table_name, payload).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.name).toBe(payload.name);
        expect(response.code).toBe(200);
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
        expect(response.code).toBe(200);
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
        expect(response.code).toBe(200);
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
        expect(response.code).toBe(200);
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
        expect(response.code).toBe(200);
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
        expect(response.results.code).toBe(404);
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
        expect(response.code).toBe(200);
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

  describe('test signup', function () {

    it('test signup', function (done) {
      scope.init();
      var username = "";
      for( var i=0; i < 15; i++ )
        username += possible.charAt(Math.floor(Math.random() * possible.length));

      var credentials = {
        username: username,
        password: "haibabon",
        email: username + "@email.com"
      }

      scope.test_signup(credentials).then(function (response) {
        objects = response.results;
        expect(response.results).toBeDefined();
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test signup with existing username', function (done) {
      scope.init();

      var credentials = {
        username: users[0].username,
        password: "haibabon",
      }
      scope.test_signup(credentials).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.code).toBe(202);
        done();
      });
    });

    // it('test signup without username', function (done) {
    //   scope.init();
    //   var username = "";

    //   var credentials = {
    //     username: username,
    //     password: "haibabon",
    //     email: username + "@email.com"
    //   }

    //   scope.test_signup(credentials).then(function (response) {
    //     console.log(response)
    //     // objects = response.results;
    //     // expect(response.results).toBeDefined();
    //     // expect(response.code).toBe(200);
    //     done();
    //   });
    // });
  });
  
  describe('test login', function () {

    it('test login', function (done) {
      scope.init();

      var credentials = {
        username: users[0].username,
        password: "haibabon",
      }

      scope.test_login(credentials).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.objectId).toBeDefined();
        expect(response.results.username).toBe(credentials.username);
        expect(response.code).toBe(200);
        // scope.logout();
        done();
      });
    });

    it('test login without password', function (done) {
      scope.init();

      var credentials = {
        username: users[0].username,
      }

      scope.test_login(credentials).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.error).toBeDefined();
        expect(response.results.code).toBe(201);
        done();
      });
    });

    it('test login with wrong password', function (done) {
      scope.init();

      var credentials = {
        username: users[0].username,
        password: "haibabo",
      }

      scope.test_login(credentials).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.error).toBeDefined();
        expect(response.results.code).toBe(101);
        done();
      });
    });

    it('test login with wrong username', function (done) {
      scope.init();

      var credentials = {
        username: "users[0].username",
        password: "haibabon",
      }

      scope.test_login(credentials).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.error).toBeDefined();
        expect(response.results.code).toBe(101);
        done();
      });
    });

  });
  
  describe('test update user', function () {

    it('test update user simple', function (done) {
      scope.init();

      var credentials = {
        username: users[0].username,
        oldPassword: "haibabon",
        password: "haibabon",
      }

      scope.test_update_user(credentials).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.id).toBe(users[0].objectId);
        expect(response.code).toBe(200);
        done();
      });
    });

    it('test update user with wrong password', function (done) {
      scope.init();

      var credentials = {
        username: users[0].username,
        oldPassword: "haibabon1",
        password: "haibabon",
      }
      
      scope.test_update_user(credentials).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.error).toBeDefined();
        expect(response.results.code).toBe(101);
        scope.logout();
        done();
      });
    });

    it('test update user with wrong username', function (done) {
      scope.init();

      var credentials = {
        username: "users[0].username",
        oldPassword: "haibabon",
        password: "haibabon",
      }
      
      scope.test_update_user(credentials).then(function (response) {
        expect(response.results).toBeDefined();
        expect(response.results.error).toBeDefined();
        expect(response.results.code).toBe(101);
        scope.logout();
        done();
      });
    });
  });
});
