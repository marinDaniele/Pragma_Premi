/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 09/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    UserRouter = require(path.resolve('./app/routers/UserRouter.js'));

describe('TU4 - UserRouter() - costruttore', function() {
    var app, httpStub;

    before(function (done) {
        httpStub = function () {
            this.get= function(methodX,methodY)
            {
                should.exist(methodX);
                should.exist(methodY);
            };
            this.post = function(methodX)
            {
                should.exist(methodX);
            }
        };
        app = function(urlvalues){
            this.index= 0;
            this.routes= urlvalues;
            var self= this;
            this.route = function (url)
            {
                self.routes[self.index].should.be.exactly(url);
                self.index++;
                return new httpStub();
            }
        };
        done();
    });

    it('Dovrebbe eseguire correttamente settando tutti i routes', function (done) {
        var application = new app(['/signup','/login','/logout']);
        UserRouter(application);
        done();
    });
});
