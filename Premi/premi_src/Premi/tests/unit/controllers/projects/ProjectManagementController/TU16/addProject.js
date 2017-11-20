/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 04/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    ProjMgmtCtrl = require(path.resolve('./app/controllers/projects/ProjectManagementController'));

describe('TU16 - addProject()', function() {
    var req, res;

    before(function (done) {
        req = function (value) {
            this.user= { _id : "55599238e1c47fdd02e31523" };//valore preso dal database premi-dev in modo da avere un id valido
            this.project= { _id : "555c3bfe7e9caf422910868e" };
            this.body = {
                name : value
            };
        };
        res= function () {
            this.error= null;
            this.json = function(result){};
        };
        done();
    });

    it('Dovrebbe fallire se non è stato definito un nome per il progetto da creare', function (done) {
        var request= new req(null);
        var response = new res();
        ProjMgmtCtrl.addProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });//valore preso dal database premi-dev in modo da avere un id valido
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente passando una richiesta corretta', function (done) {
        var request= new req('test');
        var response = new res();
        ProjMgmtCtrl.addProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });//valore preso dal database premi-dev in modo da avere un id valido
        should.not.exist(response.error);
        done();
    });
});
