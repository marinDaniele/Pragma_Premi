/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 22/05/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    NodeCtrl = require(path.resolve('./app/controllers/projects/NodeController'));

describe('TU10 - deleteAssociation()', function() {
    var req, res;

    before(function (done) {
        req = function (assId) {
            this.objid = '555c3bfe7e9caf422910868e';//valore preso dal database premi-dev in modo da avere un id valido
            var self = this;
            this.project = [1];
            this.association = {
                _id : assId
            };
            this.project.removeAssociation = function (id,callback,errback) {
                if(id === self.objid)
                    callback();
                else
                    errback(1);
            };
        };
        res = function () {
            this.error = null;

            this.json = function (messagge) {};
        };
        done();
    });

    it('Dovrebbe fallire quando viene passato un ObjectId non valido', function (done) {
        var request = new req('abc');
        var response = new res();
        NodeCtrl.deleteAssociation(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire la rimozione correttamente quando viene passato un ObjectId valido', function (done) {
        var request = new req('555c3bfe7e9caf422910868e');
        var response = new res();
        NodeCtrl.deleteAssociation(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.not.exist(response.error);
        done();
    });
});

