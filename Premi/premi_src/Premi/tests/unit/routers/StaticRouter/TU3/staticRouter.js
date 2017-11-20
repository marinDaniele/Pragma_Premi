/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 09/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    StaticRouter = require(path.resolve('./app/routers/StaticRouter.js'));

describe('TU3 - StaticRouter() - costruttore', function() {
    var app, httpStub;

    before(function (done) {
        httpStub = function () {
            this.get= function(methodX)
            {
                should.exist(methodX);
            };
        };
        app = function(urlvalues){
            this.routes= urlvalues;
            var self= this;
            this.route = function (url)
            {
                self.routes[url].should.be.exactly(1);
                return new httpStub();
            }
        };
        done();
    });

    it('Dovrebbe eseguire correttamente settando tutti i routes', function (done) {
        var urls= {
            "/statics/userManual": 1
        };
        var application = new app(urls);
        StaticRouter(application);
        done();
    });
});
