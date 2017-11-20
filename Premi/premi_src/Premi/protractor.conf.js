// An example configuration file.
exports.config = {
	directConnect: true,

	// Capabilities to be passed to the webdriver instance.
	
	capabilities: {
		'browserName': 'chrome'
	},
	baseUrl: 'http://localhost:3000/',
	// Framework to use. Jasmine 2 is recommended.
	framework: 'jasmine2',

	// Spec patterns are relative to the current working directly when
	// protractor is called.
	//specs: ['./tests/system/*.js'],
	suites: {
		all: ['./tests/system/*/*.js'],
		dashboard: ['./tests/system/dashboard/*.js'],
		presentation: ['./tests/system/presentation/*.js'],
		mindmap: ['./tests/system/mindmap/*.js'],
		edit: ['./tests/system/edit/*.js']
	},

	// Options to be passed to Jasmine.
	jasmineNodeOpts: {
		// If true, display spec names.
		isVerbose: false,
		// If true, print colors to the terminal.
		showColors: true,
		// If true, include stack traces in failures.
		includeStackTrace: true,
		// Default time to wait in ms before a test fails.
		defaultTimeoutInterval: 50000
	}
};
