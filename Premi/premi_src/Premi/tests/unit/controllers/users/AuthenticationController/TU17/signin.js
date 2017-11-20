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

describe('TU17 - signin()', function() {
    var req, res;

    before(function (done) {
        req = function (userCase) {
            var user = driver.createUserStub();
            if (userCase === 'notEmail')
                user.email = '';
            if (userCase === 'notPwd')
                user.email = '';
            this.body = user;
            this.login = function (user, next) {};
        };
        res = function () {
            this.error = null;

            this.callback = function (done) {
                should.exist(this.error);
                done();
            };
        };
        done();
    });

    it("Dovrebbe fallire se la password dell'utente è nulla o malformata", function(done){
        var response = new res();
        var request = new req('notPwd');
        Authentication.signin(request, response, function (err)
        {
            if(err) response.error = 500;
            response.callback(done);
        });
    });

    it("Dovrebbe fallire se la mail dell'utente è nulla o malformata", function(done){
        var response = new res();
        var request = new req('notEmail');
        Authentication.signin(request, response, function (err)
        {
            if(err) response.error = 500;
            response.callback(done);
        });
    });

    it("Dovrebbe autenticare correttamente l'utente nel sistema", function(done){
        var response = new res();
        var request = new req('');
        var user= request.body;
        user.save(function(err) {});
        Authentication.signin(request, response, function (err)
        {
            if(err) response.error = 500;
        });
        should.not.exist(response.error);
        done();
    });
    after(function(done) {
        User.remove().exec();
        done();
    });
});
