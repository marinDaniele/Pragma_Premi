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
    'TU25 - setFontFamily()',
    function() {
        it(
            'Deve cambiare la famiglia di font: setFontFamily()',
            function (done) {
                var font = 'verdana';
                projectStub.project.setFontFamily(
                    font,
                    function () {
                        projectStub.project.should.have.property('fontFamily', font);
                        done();
                    },
                    function (error) {
                        should.exist(error);
                    }
                );
            }
        );
    }
);
