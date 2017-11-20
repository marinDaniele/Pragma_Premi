/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 23/05/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    driver = require(path.resolve('./tests/utility/userStub')),
    Authorization = require(path.resolve('./app/controllers/users/AuthorizationController'));

describe('TU18 - requiresLogin()', function() {
    var user, req, res;

    before(function(done) {
         user = driver.createUserStub();
         req = function(is) {
             if (is) {
                 this.user = driver.createUserStub();
             }
             this.isAuthenticated = function isAuthenticated()
             {
                 return is;
             };
         };
         res = function() {
             this.error = null;

         };
        done();
    });

    it("Dovrebbe fallire se l'utente non ha eseguito login", function(done) {
        var response = new res();
        var request = new req(false);
        Authorization.requiresLogin(request,response,function(err) { response.error = 401;});
        should.exist(response.error);
        response.error.should.equal(401);
        done();
    });

     it("Dovrebbe aver successo se l'utente ha eseguito il login", function(done) {
            var response = new res();
            var request = new req(true);
            Authorization.requiresLogin(request,response,function(err){ if(err) response.error = 401; });
            should.not.exist(response.error);
            done();
        });
});
