/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 22/05/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    NodeCtrl = require(path.resolve('./app/controllers/projects/NodeController'));

describe('TU11 - addNode()', function() {
    var req, res;

    before(function (done) {
        req = function (id,mode) {
            var self = this;
            this.mode= mode;
            this.node = [1];
            this.node._id = id;
            this.project = [1];
            this.project.addNode =  function (nodeid, callback,errback) {
                if(mode === 'callback')
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

    it('Dovrebbe fallire quando si verifica un errore internamente alla funzione del progetto che inserisce un nodo ', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','errback');//valore preso dal database premi-dev in modo da avere un id valido
        var response = new res();
        NodeCtrl.addNode(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.exist(response.error);
        done();
    });


    it('Dovrebbe eseguire correttamente quando la funzione di inserimento del nodo, interna al progetto, non solleva errori', function (done) {
        var request = new req('555c3bfe7e9caf422910868e','callback');//valore preso dal database premi-dev in modo da avere un id valido
        var response = new res();
        NodeCtrl.addNode(request, response, function (err) {
            if (err)
                response.error = 1;
        });
        should.not.exist(response.error);
        done();
    });
});
