/**
 * File: ProjectRouter.PathController.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 13/06/2015
 * Descrizione: Test di integrazione TI10 - Integrazione routers-controllers
 * ProjectRouter-PathController
 */

'use strict';

var path = require('path'),
    should = require('should'),
    coverage = require(path.resolve('./app/models/UserModel')),
    User= require('mongoose').model('User'),
    userDriver = require(path.resolve('./tests/utility/userStub')),
    associationDriver = require(path.resolve('./tests/utility/associationStub')),
    request = require('supertest')(require(path.resolve('server')));

describe('TI10 - ProjectRouter.PathController : POST /projects/:projectId/paths, POST /projects/:projectId/paths/:pathId/:nodeId, GET /projects/:projectId/paths/:pathId, PUT /projects/:projectId/paths/:pathId, DELETE /projects/:projectId/paths/:pathId/:nodeId, DELETE /projects/:projectId/paths/:pathId', function(){
    var cookies, proj;

    function project(id,name,sId)
    {
        this.id=id;
        this.name=name;
        this.sourceId=sId;
        this.destinationId=null;
        this.associationId=null;
        this.pathId=null;
    }

    before(function (done) {
        request
            .post('/signup')
            .type('json')
            .send(userDriver.createUserStub())
            .expect(200,function(err,result){
                cookies = result.headers['set-cookie'].pop().split(';')[0];
                var req = request.post('/projects');
                req.cookies = cookies;
                req.type('json')
                    .send({ name : 'test'})
                    .expect(200,function(err,result){
                        proj = new project(result.body._id,result.body.name,result.body.root);
                        done();
                    });
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per addPath', function(done){
        var req = request.post('/projects/'+proj.id+'/paths');
        req.cookies = cookies;
        req.type('json')
            .send({ name : 'testPath'})
            .expect(200,function(err, result) {
                should.exist(result.body.id);//verifico che venga creato l'id del path
                result.body.name.should.be.exactly('testPath');
                proj.pathId=result.body.id;
                done();
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per addNodeToPath', function(done){
        var req = request.post('/projects/'+proj.id+'/paths/'+proj.pathId+'/'+proj.sourceId);
        req.cookies = cookies;
        req.type('json')
            .expect(200,function(err, result) {
                result.body.name.should.be.exactly('testPath');
                should.exist(result.body.nodes);
                done();
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per getPath', function(done){
        var req = request.get('/projects/'+proj.id+'/paths/'+proj.pathId);
        req.cookies = cookies;
        req.type('json')
            .expect(200,function(err, result) {
                result.body.name.should.be.exactly('testPath');
                should.exist(result.body.nodes);
                done();
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per updatePath', function(done){
        var req = request.put('/projects/'+proj.id+'/paths/'+proj.pathId);
        req.cookies = cookies;
        req.type('json')
            .send({ name : 'updateTestPath'})
            .expect(200,function(err, result) {
                result.body.status.should.be.exactly('ok');
                done();
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per deleteNodeFromPath', function(done){
    var req = request.delete('/projects/'+proj.id+'/paths/'+proj.pathId+'/'+proj.sourceId);
    req.cookies = cookies;
    req.type('json')
        .expect(200,function(err, result) {
            result.body.name.should.be.exactly('updateTestPath');
            should.exist(result.body.nodes);
            done();
        });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per deletePath', function(done){
        var req = request.delete('/projects/'+proj.id+'/paths/'+proj.pathId);
        req.cookies = cookies;
        req.type('json')
            .expect(200,function(err, result) {
                result.body.status.should.be.exactly('ok');
                done();
            });
    });

    after(function(done) {
        User.remove().exec();
        done();
    });
});
