/**
 * File: ProjectRouter.NodeController.Association.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 13/06/2015
 * Descrizione: Test di integrazione TI10 - Integrazione routers-controllers
 * ProjectRouter-NodeController-Association
 */

'use strict';

var path = require('path'),
    should = require('should'),
    coverage = require(path.resolve('./app/models/UserModel')),
    User= require('mongoose').model('User'),
    userDriver = require(path.resolve('./tests/utility/userStub')),
    associationDriver = require(path.resolve('./tests/utility/associationStub')),
    request = require('supertest')(require(path.resolve('server')));

describe('TI10 - ProjectRouter.NodeController : POST /projects/:projectId/associations', function(){
    var cookies, proj;
    function project(id,name,sId)
    {
        this.id=id;
        this.name=name;
        this.sourceId=sId;
        this.destinationId=null;
        this.associationId=null;
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
                        req = request.post('/projects/'+proj.id+'/nodes/'+proj.sourceId);
                        req.cookies = cookies;
                        req.type('json')
                            .expect(200,function(err, result) {
                                proj.destinationId= result.body._id;//setto l'id del nuovo nodo per poterlo associare con addAssociation
                                done();
                            });
                        });
                });
        });

    it('dovrebbe seguire il flusso di esecuzione atteso per addAssociation', function(done){
        var req = request.post('/projects/'+proj.id+'/associations');
        req.cookies = cookies;
        req.type('json')
            .send(associationDriver.createAssociationStub(proj.sourceId,proj.destinationId))
            .expect(200,function(err, result) {
                should.exist(result.body._id);//verifico che venga creato l'id dell'associazione
                proj.associationId=result.body._id;
                done();
            });
    });

    it('dovrebbe seguire il flusso di esecuzione atteso per deleteAssociation', function(done){
        var req = request.delete('/projects/'+proj.id+'/associations/'+proj.associationId);
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
