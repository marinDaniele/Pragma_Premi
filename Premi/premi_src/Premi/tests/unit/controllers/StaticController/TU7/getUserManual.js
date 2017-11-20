/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 05/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    StaticController = require(path.resolve('./app/controllers/StaticController'));

describe('TU7 - getUserManual()', function() {
    var res;

    before(function (done) {
        res = function ()
        {
            this.status= null;
            var self= this;
            this.sendFile = function(result)
            {
                if(result)
                    self.status= 'ok';
            };
        };
        done();
    });

    it('Dovrebbe eseguire correttamente invocando sendFile', function (done) {
        var response = new res();
        StaticController.getUserManual(null,response);
        response.status.should.be.exactly('ok');
        done();
    });
});
