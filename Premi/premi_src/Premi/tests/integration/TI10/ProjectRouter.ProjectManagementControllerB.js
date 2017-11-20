/**
 * File: ProjectRouter.ProjectManagementControllerB.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 14/06/2015
 * Descrizione: Test di integrazione TI10 - Integrazione routers-controllers
 * ProjectRouter-ProjectManagementController - B
 */

'use strict';

var path = require('path'),
    should = require('should'),
    projectDriver= require(path.resolve('./tests/utility/projUpdateStub')),
    coverage = require(path.resolve('./app/models/UserModel')),
    User= require('mongoose').model('User'),
    userDriver = require(path.resolve('./tests/utility/userStub')),
    request = require('supertest')(require(path.resolve('server')));

describe('TI10 - ProjectRouter.ProjectManagementController : PUT /projects/:projectId, DELETE /projects/:projectId, GET /projects/:projectId/presentations'
    , function(){
        var cookies, proj;
        function project(id,name,root,pathId)
        {
            this.id=id;
            this.name=name;
            this.root=root;
            this.pathId=pathId;
        }

        before(function (done) {
            request
                .post('/signup')
                .type('json')
                .send(userDriver.createUserStub())
                .end(function(err,result){
                    cookies = result.headers['set-cookie'].pop().split(';')[0];
                    var req = request.post('/projects');
                    req.cookies = cookies;
                    req.type('json')
                    .send({ name : 'test'})
                    .expect(200,function(err,result){
                        proj= new project(result.body._id,result.body.name,result.body.root,result.body.paths[0]._id);
                        done();
                    });
                });
        });

        it('dovrebbe seguire il flusso di esecuzione atteso per updateProject', function(done){
            var req = request.put('/projects/'+proj.id);
            req.cookies = cookies;
            req.type('json')
                .send(projectDriver.createProjUpdateStub())
                .expect(200,function(err,result){
                    result.body.status.should.be.exactly('ok');
                    done();
                });
        });
        //precede deleteProject in modo da poter usare l'istanza di progetto creata nel DB
        it('dovrebbe seguire il flusso di esecuzione atteso per getPresentation', function(done){
            var req = request.get('/projects/'+proj.id+'/presentations');
            req.cookies = cookies;
            req.type('json')
                .expect(200,function(err,result){
                    should.exist(result.body.frames);
                    should.exist(result.body.frames[0]);
                    should.exist(result.body.frames[0].node);
                    should.exist(result.body.frames[0].family);
                    done();
                });
        });        
        //precede deleteProject in modo da poter usare l'istanza di progetto creata nel DB
        it('dovrebbe seguire il flusso di esecuzione atteso per getAllPaths', function(done){
            var req = request.get('/projects/'+proj.id+'/paths');
            req.cookies = cookies;
            req.type('json')
                .expect(200,function(err,result){
                    result.body.paths[0]._id.should.be.exactly(proj.pathId);
                    should.exist(result.body.paths[0].name);
                    should.exist(result.body.paths[0].default);
                    should.exist(result.body.paths[0].nodes);
                    done();
                });
        });

        it('dovrebbe seguire il flusso di esecuzione atteso per deleteProject', function(done){
            var req = request.delete('/projects/'+proj.id);
            req.cookies = cookies;
            req.type('json')
                .expect(200,function(err,result){
                    result.body.status.should.be.exactly('ok');
                    done();
                });
        });

    after(function(done) {
        User.remove().exec();
        done();
    });
});
