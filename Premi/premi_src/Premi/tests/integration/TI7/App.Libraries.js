/**
 * File: App.Libraries.js
 * @author fvedovato - blacky_grp@yahoo.com
 * Data: 12/06/2015
 * Descrizione: Test di integrazione TI7 - Integrazione con Express e Node.js
 */

'use strict'

describe('TI7 - App si deve integrare correttamente con le librerie di Express e Node.js che vengono utilizzate', function(){
process.env.NODE_ENV= '';
var path= require('path');
    init = require(path.resolve('./config/init'))(),
    config = require(path.resolve('./config/config')),
    mongoose = require('mongoose'),
    chalk = require('chalk');

    mongoose= new mongoose.Mongoose();

    var db = mongoose.connect('mongodb://localhost/premi-stub', function(err) {
        if (err) {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.log(chalk.red(err));
        }
    });

    var app = require(path.resolve('./config/express'))(db);

    require(path.resolve('./config/passport'))();

    app.listen(config.port, function(){
        should.exist(app);
        should.exist(mongoose);
        should.exist(chalk);
        done();
    });

});
