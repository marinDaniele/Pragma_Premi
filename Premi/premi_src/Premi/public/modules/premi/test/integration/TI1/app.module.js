/**
 * File: app.module.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-14
 * Descrizione: Test di integrazione TU1 Test modulo 'premi'
 */
 'use strict';
describe("TI1 Test modulo 'premi'", function() {

  var module;
  beforeEach(function() {
    module = angular.module("premi");
  });

  it("Dovrebbe essere registrato", function() {
    expect(module).not.toEqual(null);
  });

  describe("Dipendenze:", function() {
    var deps;
    var hasModule = function(m) {
      return deps.indexOf(m) >= 0;
    };

    beforeEach(function() {
      deps = module.value('appName').requires;
    });

    it("Dovrebbe avere una dipendenza con il modulo 'premi.controllers'", function() {
      expect(hasModule('premi.controllers')).toEqual(true);
    });

    it("Dovrebbe avere una dipendenza con il modulo 'premi.directives'", function() {
      expect(hasModule('premi.directives')).toEqual(true);
    });

    it("Dovrebbe avere una dipendenza con il modulo 'premi.services'", function() {
      expect(hasModule('premi.services')).toEqual(true);
    });

    it("Dovrebbe avere una dipendenza con il modulo 'ngMaterial'", function() {
      expect(hasModule('ngMaterial')).toEqual(true);
    });

    it("Dovrebbe avere una dipendenza con il modulo 'ngRoute'", function() {
      expect(hasModule('ngRoute')).toEqual(true);
    });

    it("Dovrebbe avere una dipendenza con il modulo 'ngTouch'", function() {
      expect(hasModule('ngTouch')).toEqual(true);
    });
  });
});
