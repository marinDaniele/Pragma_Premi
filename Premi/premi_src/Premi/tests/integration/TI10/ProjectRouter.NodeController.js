/**
 * File: ProjectRouter.NodeController.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 13/06/2015
 * Descrizione: Test di integrazione TI10 - Integrazione routers-controllers
 * ProjectRouter-NodeController
 */

'use strict';

var path = require('path'),
    should = require('should'),
    coverage = require(path.resolve('./app/models/UserModel')),
    User= require('mongoose').model('User'),
    userDriver = require(path.resolve('./tests/utility/userStub')),
    contentDriver = require(path.resolve('./tests/utility/contentStub')),
    request = require('supertest')(require(path.resolve('server')));

describe('TI10 - ProjectRouter.NodeController : POST /projects/:projectId/nodes/:nodeId, PUT /projects/:projectId/nodes/:nodeId, DELETE /projects/:projectId/nodes/:nodeId', function(){
    var cookies, proj;
    function project(id,name,nodeId)
    {
        this.id=id;
        this.name=name;
        this.nodeId=nodeId;
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

    it('dovrebbe seguire il flusso di esecuzione atteso per addNode', function(done){
    var req = request.post('/projects/'+proj.id+'/nodes/'+proj.nodeId);
    req.cookies = cookies;
    req.type('json')
        .expect(200,function(err, result) {
            should.exist(result.body._id);
            should.exist(result.body.contents[0]);
            proj.nodeId= result.body._id;//setto l'id del nuovo nodo per poterlo eliminare con deleteNode succesivamente
            done();
        });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per updateNode', function(done){
    var req = request.put('/projects/'+proj.id+'/nodes/'+proj.nodeId);
    req.cookies = cookies;
    req.type('json')
        .send(contentDriver.createContentStub())
        .expect(200,function(err, result) {
            result.body.status.should.be.exactly('ok');
            done();
        });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per deleteNode', function(done){
        var req = request.delete('/projects/'+proj.id+'/nodes/'+proj.nodeId);//l'id del nodo
        req.cookies = cookies;
        req.type('json')
            .expect(200,function(err, result) {
                should.exist(result.body._id);
                should.exist(result.body.root);
                done();
            });
    });

    after(function(done) {
        User.remove().exec();
        done();
    });
});
