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

//compara due nodi, necessaria per escludere il campo id dei contenuti
function compareNodeContents(content1, content2)
{
    return (content1.class === content2.class && content1.content === content2.content &&
    content1.x === content2.x && content1.y === content2.y && content1.height === content2.height &&
    content1.width === content2.width);

}

describe(
    'TU26 - updateNode()',
    function() {
        it(
            'Deve aggiornare il contenuto di un nodo',
            function(done)
            {
                projectStub.project.updateNode(
                    projectStub.project.nodes[0],
                    projectStub.contents,
                    function()
                    {
                        var updated = projectStub.project.nodes[0];
                        for (var i=0; i<projectStub.contents.length; i++)
                        {
                            should(compareNodeContents(updated.contents[i], projectStub.contents[i]));
                        }
                        done();
                    },
                    function(error)
                    {
                        should.exist(error);
                        done();
                    }
                );
            }
        );
    }
);
