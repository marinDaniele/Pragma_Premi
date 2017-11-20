/**
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 03/06/2015
 */
'use strict';
var path = require('path'),
    should = require('should'),
    cov_proj = require(path.resolve('./app/models/ProjectModel')),
    ProjMgmtCtrl = require(path.resolve('./app/controllers/projects/ProjectManagementController'));

describe('TU16 - updateProject()', function() {
    var req, res;

    before(function (done) {
        req = function (values) {
            this.project= { _id : "555c3bfe7e9caf422910868e" };//valore preso dal database premi-dev in modo da avere un id valido
            this.body = {
                name : values[0],
                bkgColor : values[1],
                fontColor : values[2],
                fontFamily : values[3]
            };
            this.project.setName= function(result,callback,errback){ callback()};
            this.project.setBkgColor=  function(result,callback,errback){ callback()};
            this.project.setFontColor= function(result,callback,errback){ callback()};
            this.project.setFontFamily= function(result,callback,errback){ callback()};
        };
        res= function () {
            this.error= null;
            this.json = function(result){};
        };
        done();
    });

    it('Dovrebbe fallire se il parametro name non è definito', function (done) {
        var request= new req([null,"test","test","test"]);
        var response = new res();
        ProjMgmtCtrl.updateProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe fallire se il parametro bkgColor non è definito', function (done) {
        var request= new req(["test",null,"test","test"]);
        var response = new res();
        ProjMgmtCtrl.updateProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe fallire se il parametro fontColor non è definito', function (done) {
        var request= new req(["test","test",null,"test"]);
        var response = new res();
        ProjMgmtCtrl.updateProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe fallire se il parametro fontFamily non è definito', function (done) {
        var request= new req(["test","test","test",null]);
        var response = new res();
        ProjMgmtCtrl.updateProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });
        should.exist(response.error);
        done();
    });

    it('Dovrebbe eseguire correttamente se tutti i parametri sono definiti', function (done) {
        var request= new req(["test","test","test","test"]);
        var response = new res();
        ProjMgmtCtrl.updateProject(request, response,
            function(err){
                if(err)
                    response.error= 1;
            });
        should.not.exist(response.error);
        done();
    });
});
