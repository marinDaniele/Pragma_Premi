/**
 * File: TU74.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 2015-05-16
 * Descrizione: Test di unità TU74 Premi::Front-End::Model::Project
 */
'use strict';
describe('TU74 Premi::Front-End::Model::Project', function(){
    //creo un progetto
    var project;

    //inizio il test
    beforeEach(function(){
        project = new Project('projectId','testProject', '#FFFFFF', 'Roboto', '#CCCCCC', 'rootID');
    });

    it("Verifico setName", function(){

        project.setName('newName');
        var name = project.getName();
        expect(name).toEqual('newName');

    });

    it("Verifico setBackgroundColor", function(){

        project.setBackgroundColor('#DDDDDD');
        var bgColor = project.getBackgroundColor();
        expect(bgColor).toEqual('#DDDDDD');

    });

    it("Verifico setFontFamily", function(){

        project.setFontFamily('Verdana');
        var font = project.getFontFamily();
        expect(font).toEqual('Verdana');

    });

    it("Verifico setTextColor", function(){

        project.setTextColor('#555555');
        var textColor = project.getTextColor();
        expect(textColor).toEqual('#555555');

    });

});
