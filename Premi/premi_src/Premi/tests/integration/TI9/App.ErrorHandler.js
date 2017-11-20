/**
 * File: App.ErrorHandler.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 13/06/2015
 * Descrizione: Test di integrazione TI9 - Integrazione routers-package "App" - ErrorHandler
 */

'use strict';

var path = require('path'),
    should = require('should'),
    request = require('supertest'),
    coverage = require(path.resolve('./app/models/UserModel')),
    User= require('mongoose').model('User'),
    userDriver = require(path.resolve('./tests/utility/userStub')),
    server = require(path.resolve('server'));

describe('TI9 - App.ErrorHandler', function(){
    var user;

    before(function (done){
        user= userDriver.createUserStub();
        done();
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per ErrorHandler ritornando un errore 11000', function(done){
        user.save(function(err){});
        request(server)
            .post('/signup')
            .type('json')
            .send(user)
            .expect(11000,function(req,res){ done()});
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per ErrorHandler ritornando un errore 401', function(done){
        request(server)
            .post('/projects')
            .type('json')
            .send({name: 'test'})
            .expect(401,function(req,res){ done()});
    });

    after(function(done) {
        User.remove().exec();
        done();
    });
});
