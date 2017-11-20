/**
 * File: TU73.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-17
 * Descrizione: Test di unità TU73 Premi::Front-End::Model::Project
 */
'use strict';
describe('Test di unità TU73 Premi::Front-End::Model::Project', function(){
    // creo un progetto
    var project;

    //inizio il test
    beforeEach(function(){
        project = new Project('projectId','testProject', '#FFFFFF', 'Roboto', '#CCCCCC', 'rootID');
    });

    it("Verifico getRootId", function(){
        var rootId = project.getRootId();
        expect(rootId).toEqual('rootID');
    });

    it("Verifico getId", function(){
        var id = project.getId();
        expect(id).toEqual('projectId');
    });

    it("Verifico getName", function(){
        var name = project.getName();
        expect(name).toEqual('testProject');
    });

    it("Verifico getBackgroundColor", function(){
        var bgColor = project.getBackgroundColor();
        expect(bgColor).toEqual('#FFFFFF');
    });

    it("Verifico getFontFamily", function(){
        var font = project.getFontFamily();
        expect(font).toEqual('Roboto');
    });

    it("Verifico getTextColor", function(){
        var textColor = project.getTextColor();
        expect(textColor).toEqual('#CCCCCC');
    });

});
