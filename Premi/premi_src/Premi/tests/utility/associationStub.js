'use strict';

module.exports.createAssociationStub = function (sour,dest)
{
	var options = {
		"sourceId" : sour,
        "destinationId" : dest
    }
    return options;
};