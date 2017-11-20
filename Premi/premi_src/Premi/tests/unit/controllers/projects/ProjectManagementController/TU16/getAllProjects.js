/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 04/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    ProjMgmtCtrl = require(path.resolve('./app/controllers/projects/ProjectManagementController'));

describe('TU16 - getAllProjects()', function() {
    var req, res;

    before(function (done) {
        req = function () {
            this.user= { _id : "55599238e1c47fdd02e31523" };//valore preso dal database premi-dev in modo da avere un id valido
            this.project= { _id : "555c3bfe7e9caf422910868e" };
        };
        res= function () {
            this.error= null;
            this.json = function(result){};
        };
        done();
    });

    it('Dovrebbe eseguire correttamente passando un ObjectId di utente qualsiasi', function (done) {
        var request= new req();
        var response = new res();
        ProjMgmtCtrl.getProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });//valore preso dal database premi-dev in modo da avere un id valido
        should.not.exist(response.error);
        done();
    });
});
