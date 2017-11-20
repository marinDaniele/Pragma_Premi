/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 03/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    ProjMgmtCtrl = require(path.resolve('./app/controllers/projects/ProjectManagementController'));

describe('TU15 - deleteProject()', function() {
    var req, res;

    before(function (done) {
        req = function (status) {
            this.errorcase= status;
            this.project= { _id : "555c3bfe7e9caf422910868e" };//valore preso dal database premi-dev in modo da avere un id valido
            var self= this;
            this.project.remove = function(callback){
                if(self.errorcase)
                    callback('errore');//si è verificato un errore
                else
                    callback(null);//nessun errore
            };
        };
        res= function () {
            this.error= null;
            this.json = function(result){};
        };
        done();
    });

    it('Dovrebbe fallire se si verificano errori durante la rimozione del progetto', function (done) {
        var request= new req(true);
        var response = new res();
        ProjMgmtCtrl.deleteProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente se non si verficano errori', function (done) {
        var request= new req(false);
        var response = new res();
        ProjMgmtCtrl.deleteProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });
        should.not.exist(response.error);
        done();
    });
});
