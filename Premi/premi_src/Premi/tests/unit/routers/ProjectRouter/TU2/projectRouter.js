/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 09/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    ProjectRouter = require(path.resolve('./app/routers/ProjectRouter.js'));

describe('TU2 - ProjectRouter() - costruttore', function() {
    var app, httpStub;

    before(function (done) {
        httpStub = function () {
            var self= this;
            this.check = function(methodX, methodY) {
                should.exist(methodX);
                should.exist(methodY);
            };
            this.get= function(methodX,methodY)
            {
                self.check(methodX,methodY);
            };
            this.post = function(methodX,methodY)
            {
                self.check(methodX,methodY);
            };
            this.put = function(methodX,methodY)
            {
                self.check(methodX,methodY);
            };
            this.delete = function(methodX,methodY)
            {
                self.check(methodX,methodY);
            };
        };
        app = function(urls) {
            this.routes= urls;
            var self= this;
            this.route = function (url)
            {
                self.routes[url].should.be.exactly(1);
                return new httpStub();
            };
            this.param = function (param, methodX)
            {
                self.routes[param].should.be.exactly(1);
                should.exist(methodX);
            };
        };
        done();
    });

    it('Dovrebbe eseguire correttamente settando tutti i routes ed i middleware sui parametri', function (done) {
        var urls= {
            "/projects" : 1 ,
            "/projects/:projectId": 1,
            "/projects/:projectId/presentations" : 1,
            "/projects/:projectId/paths" : 1,
            "/projects/:projectId/nodes/:nodeId" : 1,
            "/projects/:projectId/associations" : 1,
            "/projects/:projectId/associations/:associationId" : 1,
            "/projects/:projectId/paths/:pathId/:nodeId" : 1,
            "/projects/:projectId/paths/:pathId" : 1,
             "projectId" : 1,
             "nodeId" : 1,
             "pathId" : 1,
            "associationId" : 1
        };
        var application = new app(urls);
        ProjectRouter(application);
        done();
    });
});
