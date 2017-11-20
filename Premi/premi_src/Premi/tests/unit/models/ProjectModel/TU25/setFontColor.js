/**
 * @author Gianmarco Midena (rockstar249@gmail.com)
 * Data: 25/05/2015
 */

'use strict';

var path = require('path'),
    should = require('should'),
    mongoose = require('mongoose'),
    projectStub = require(path.resolve('./tests/utility/projectStub')),
    Project = mongoose.model('Project');

describe(
    'TU25 - setFontColor()',
    function () {
        it(
            'Deve cambiare il colore dei font per il progetto',
            function(done)
            {
                var color = 'red';
                projectStub.project.setFontColor(
                    color,
                    function()
                    {
                        projectStub.project.should.have.property('fontColor', color);
                        done();
                    },
                    function(error)
                    {
                        should.exist(error);
                    }
                );
            }
        );
    }
);
