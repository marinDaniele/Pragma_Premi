/**
 * @class Server
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * @ignore Data: 11/05/2015
 * @ignore Requisiti: RFO36
 * @classdesc Classe che avvia il server. Nello specifico apre una connessione al database tramite Mongoose, invoca il
 * middleware Express passando un riferimento al database MongoDB come parametro in modo che possa configurarsi con esso,
 * invoca il middleware Passport ed infine si mette in ascolto su una determinata porta.
 * @memberof Back-End
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('~~Premi~~ application started on port ' + config.port);
