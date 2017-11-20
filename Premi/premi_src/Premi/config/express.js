'use strict';
/**
 * @class Session
 * @author Stefano Munari (stefanomunari.sm@gmail.com)
 * Data: 12/05/2015
 * Requisiti: RFO30.2, RFO30.3, RFO30.4, RFO32
 * @classdesc Classe che carica e configura i moduli necessari all'avvio dell'applicazione, in particolare imposta
 * passport session in modo da poter inizializzare una sessione utente in mongoDB.
 * @memberof Back-End::App::Models
 */
/*---PRIVATE---*/
var fs = require('fs'),
	http = require('http'),
	https = require('https'),
	express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	passport = require('passport'),
	mongoStore = require('connect-mongo')({
		session: session
	}),
	flash = require('connect-flash'),
	config = require('./config'),
	//consolidate = require('consolidate'),
	path = require('path'),
	ErrorHandler = require('../app/controllers/ErrorHandler'),
	NotFoundHandler = require('../app/controllers/NotFoundHandler');

module.exports = function(db) {
	// Initialize express app
	var app = express();

	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	//app.locals.facebookAppId = config.facebook.clientID;
	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);


	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: new mongoStore({
			db: db.connection.db,
			collection: config.sessionCollection
		})
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages
	app.use(flash());

	// Use helmet to secure Express headers
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public/modules/premi/')));
	app.use("/statics/userManual", express.static(path.resolve('./app/views/')));

	// Globbing routing files
	config.getGlobbedFiles('./app/routers/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	app.use(
		function(err, req, res, next)
		{
			ErrorHandler.handle(err,req,res,next);
		}
	);

	// Assume 404 since no middleware responded
	app.use(
		function(req, res)
		{
			NotFoundHandler.handle(req,res);
		}
	);


	// Return Express server instance
	return app;
};
