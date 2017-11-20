/**
 * File: ProjectRouter.ProjectManagementControllerA.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 13/06/2015
 * Descrizione: Test di integrazione TI10 - Integrazione routers-controllers
 * ProjectRouter-ProjectManagementController - A
 */

'use strict';

var path = require('path'),
    should = require('should'),
    coverage = require(path.resolve('./app/models/UserModel')),
    User= require('mongoose').model('User'),
    userDriver = require(path.resolve('./tests/utility/userStub')),
    request = require('supertest')(require(path.resolve('server')));

describe('TI10 - ProjectRouter.ProjectManagementController : POST /projects, GET /projects, GET /projects/:projectId', function(){
    var cookies, proj;
    function project(id,name,root)
    {
        this.id=id;
        this.name=name;
        this.root=root;
    }
    before(function (done) {
        request
            .post('/signup')
            .type('json')
            .send(userDriver.createUserStub())
            .expect(200,function(err,result){
                cookies = result.headers['set-cookie'].pop().split(';')[0];
                done();
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per addProject', function(done){
        var req = request.post('/projects');
        req.cookies = cookies;
        req.type('json')
            .send({ name : 'test'})
            .expect(200,function(err, result) {
                should.exist(result.body.root);
                should.exist(result.body.userId);
                should.exist(result.body.fontColor);
                should.exist(result.body.bkgColor);
                should.exist(result.body.paths);
                should.exist(result.body._id);
                result.body.name.should.be.exactly('test');
                proj = new project(result.body._id,result.body.name,result.body.root);
                done();
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per getAllProjects', function(done){
        var req = request.get('/projects');
        req.cookies = cookies;
        req.type('json')
            .expect(200,function(err, result) {
                result.body[0].name.should.be.exactly(proj.name);
                result.body[0]._id.should.be.exactly(proj.id);
                done();
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per getProject', function(done){
        var req = request.get('/projects/'+proj.id);
        req.cookies = cookies;
        req.type('json')
            .expect(200,function(err, result) {
                result.body.name.should.be.exactly(proj.name);
                result.body.root.should.be.exactly(proj.root);
                should.exist(result.body.nodes);
                done();
            });
    });

    after(function(done) {
        User.remove().exec();
        done();
    });
});
