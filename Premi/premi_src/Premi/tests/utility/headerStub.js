'use strict';

module.exports.defaultGetOptions = function (port)
{
    var options = {
        "host": 'localhost',
        "port": port,
        "path": '/logout',
        "method": 'GET',
        "headers": {
            "Cookie": null
        }
    };
    return options;
};
