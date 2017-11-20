/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 04/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    PremiError = require(path.resolve('./app/controllers/errors/PremiError'));

describe('TU8 - toJSON()', function() {

    it('Dovrebbe creare un JSON corrispondente al PremiError creato', function (done) {
        var result= null;
        result = new PremiError(8002).toJSON();
        should.exist(result);
        done();
    });
});
