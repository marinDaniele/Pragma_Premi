/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 22/05/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    driver = require(path.resolve('./tests/utility/contentStub')),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    NodeCtrl = require(path.resolve('./app/controllers/projects/NodeController'));

describe('TU11 - updateNode()', function() {
    var req, res;

    before(function (done) {
        req = function (id, cont, mode) {
            var self = this;
            this.mode = mode;
            this.node = [1];
            this.body = {
              contents : cont
            };
            this.node._id = id;
            this.project = [1];
            this.project.updateNode = function (nodeid, contents, callback, errback) {
                if (mode === 'callback')
                    callback(nodeid);
                else
                    errback(nodeid);
            };
        };
        res = function () {
            this.error = null;
            this.json = function (messagge) {
            };
        };
        done();
    });

    it('Dovrebbe fallire quando i contenuti non sono validi ', function (done) {
        var content = driver.createContentStub();
        content[0].width= -1;
        var request = new req('555c3bfe7e9caf422910868e', content, 'errback');//valore preso dal database premi-dev in modo da avere un id valido
        var response = new res();
        NodeCtrl.updateNode(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe fallire quando si verifica un errore internamente alla funzione del progetto che aggiorna un nodo ', function (done) {
        var request = new req('555c3bfe7e9caf422910868e', driver.createContentStub(),'errback');//valore preso dal database premi-dev in modo da avere un id valido
        var response = new res();
        NodeCtrl.updateNode(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente quando i contenuti sono validi e non ci sono errori internamente alla funzione del progetto che aggiorna un nodo ', function (done) {
        var request = new req('555c3bfe7e9caf422910868e',driver.createContentStub(),'callback');//valore preso dal database premi-dev in modo da avere un id valido
        var response = new res();
        NodeCtrl.updateNode(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.not.exist(response.error);
        done();
    });
});
