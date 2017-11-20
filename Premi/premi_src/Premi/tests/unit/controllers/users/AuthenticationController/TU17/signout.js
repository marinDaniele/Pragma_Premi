/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 23/05/2015
 */

'use strict';
var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    driver = require(path.resolve('./tests/utility/userStub')),
    Authentication = require(path.resolve('./app/controllers/users/AuthenticationController'));

describe('TU17 - signout()', function() {
    var req, res;

    before(function (done) {
        req = function () {
            this.logout= function(){};
        };
        res = function() {
            this.error = null;
            this.json = function(status){};
        };
        done();
    });

    it("Dovrebbe eseguire il logout correttamente", function(done) {
        var response = new res();
        var request = new req();
        Authentication.signup(request, response);
        should.not.exist(response.error);
        done();
    });

});
