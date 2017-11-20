'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports.createUserStub= function ()
{
    return new User({
        username: 'test@test.com',
        password: 'password'
    });
};
