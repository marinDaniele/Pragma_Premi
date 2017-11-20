/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 05/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    NotFoundHandler = require(path.resolve('./app/controllers/NotFoundHandler'));

describe('TU6 - handle()', function() {
    var res, req;

    before(function (done) {
        res = function ()
        {
            this.error = null;
            this.code= null;
            var self= this;
            this.status= function (stat){
                self.code= stat;
                return self;
            };
            this.json = function (error) {
                should.exist(error);
            };
        };
        req = function ()
        {
            this.originalUrl = 'http://test';
        };
        done();
    });

    it('Dovrebbe eseguire correttamente creando un errore per pagina non trovata', function (done) {
        var request = new req();
        var response = new res();
        NotFoundHandler.handle(request,response);
        should.not.exist(response.error);
        done();
    });
});
