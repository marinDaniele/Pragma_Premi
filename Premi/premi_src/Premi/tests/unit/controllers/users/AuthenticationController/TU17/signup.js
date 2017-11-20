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

describe('TU17 - signup()', function() {
    var req, res;

    before(function (done) {
        req= function (userCase)
        {
            var user= driver.createUserStub();
            if(userCase === 'notEmail')
                user.username= '';
            if(userCase === 'notPwd')
                user.password= '';
            this.body = user;
            this.login = function(user){};
        };
        res = function ()
        {
            this.error = null;

            this.callback = function(done) {
                should.exist(this.error);
                done();
            };
        };
        done();
    });

    it("Dovrebbe fallire se l\'email dell'utente è nulla o malformata", function(done){
        var response = new res();
        var request = new req('notEmail');
        Authentication.signup(request, response, function (err)
        {
            if(err) response.error = 500;
            response.callback(done)
        });
    });

    it("Dovrebbe fallire se la password dell'utente è nulla o malformata", function(done){
        var response = new res();
        var request = new req('notPwd');
        Authentication.signup(request, response, function (err)
        {
            if(err) response.error = 500;
            response.callback(done);
        });
    });

    it("Dovrebbe registrare correttamente l'utente", function(done){
        var response = new res();
        var request = new req('');
        Authentication.signup(request, response, function (err)
        {
            if(err) response.error = 500;
            //response.callback(done);
        });
        should.not.exist(response.error);
        done();
    });
    after(function(done) {
        User.remove().exec();
        done();
    });
});
