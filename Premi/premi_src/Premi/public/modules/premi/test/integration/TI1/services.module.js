/**
 * File: services.module.js
 * @author gmidena - rockstar249@gmail.com
 * Data: 2015-06-14
 * Descrizione: Test di integrazione TU1 Test modulo 'premi.services'
 */
 'use strict';
describe("TI1 Test modulo 'premi.services'", function() {

  var module;
  beforeEach(function() {
    module = angular.module('premi.services');
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
  });
});
