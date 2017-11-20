/**
 * File: UserRouter.UserController.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 14/06/2015
 * Descrizione: Test di integrazione TI10 - Integrazione routers-controllers
 * UserRouter-UserController
 */
'use strict';
var path = require('path'),
    should = require('should'),
    coverage = require(path.resolve('./app/models/UserModel')),
    User= require('mongoose').model('User'),
    userDriver = require(path.resolve('./tests/utility/userStub')),
    request = require('supertest')(require(path.resolve('server'))),
    cookies;

describe('TI10 - UserRouter : POST /signup', function(){
    var user;

    before(function (done) {
        user= userDriver.createUserStub();
        done();
    });
    it('dovrebbe seguire il flusso di esecuzione atteso per signup', function(done){
       request
       .post('/signup')
       .type('json')
       .send(user)
       .expect(200,function(err, result) {
           result.body.status.should.be.exactly('ok');
           done();
       });
    });
});

describe('TI10 - UserRouter : POST /login', function(){
    var user;

    before(function (done) {
        user= userDriver.createUserStub();
        done();
    });
    //login va messa precedentemente a tutte le altre perchè inizializza cookies
    it('dovrebbe seguire il flusso di esecuzione atteso per login', function(done){
        user.save(function(err){});
         request
             .post('/login')
             .type('json')
             .send(user)
             .expect(200,function(err, result) {
                 result.body.status.should.be.exactly('ok');
                 cookies = result.headers['set-cookie'].pop().split(';')[0];
                 done();
             });
     });

    it('dovrebbe seguire il flusso di esecuzione atteso per logout -utente autenticato', function(done){
        var req= request.get('/logout');
        req.cookies = cookies;
        req.expect(200,function(err,result){
            result.body.status.should.be.exactly('ok');
            done();
        });
    });

    it('dovrebbe ritornare un errore con codice 401 se richiedo logout senza essere autenticato', function(done){
        request
            .get('/logout')
            .expect(401,done);
    });

    after(function(done) {
        User.remove().exec();
        done();
    });
});
