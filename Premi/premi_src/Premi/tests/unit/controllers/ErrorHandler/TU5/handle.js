/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 04/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    ErrorHandler = require(path.resolve('./app/controllers/ErrorHandler')),
    PremiError = require(path.resolve('./app/controllers/errors/PremiError'));

describe('TU5 - handle()', function() {
    var res, err;

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
        err = function (code)
        {
            this.code = code;
            this.stack = 'errore gestibile da ErrorHandler';
        };
        done();
    });

    it('Dovrebbe eseguire la chiamata next() nel caso venisse passato un parametro d\'errore vuoto', function (done) {
        var response = new res();
        ErrorHandler.handle('', null, response, function(){
            response.error='next() invocato';
        });
        response.error.should.be.exactly('next() invocato');
        done();
    });

    it('Dovrebbe eseguire correttamente la gestione dell\'errore nal caso venga passata un\'istanza di PremiError', function (done) {
        var response = new res();
        ErrorHandler.handle(new PremiError(8002), null, response, function(){
            response.error='next() invocato';
        });
        should.not.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente la gestione dell\'errore nal caso venga passato un errore identificabile diverso da PremiError', function (done) {
        var error= new err(401);
        var response = new res();
        ErrorHandler.handle(error, null, response, function(){
            response.error='next() invocato';
        });
        should.not.exist(response.error);
        done();
    });
});
