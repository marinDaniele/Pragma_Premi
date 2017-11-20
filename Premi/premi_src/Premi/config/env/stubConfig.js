'use strict';

module.exports = {
	db: 'mongodb://localhost/premi-stub',
	port: 3007,
	app: {
		title: 'premi - TI8 configurationStub'
	},
	sessionSecret: 'STUB',
	sessionCollection: 'sessions',
	assets: {
		css: ['testT8'],
		lib: {
			css: [
				'public/modules/**/css/*.css'
			]
	}
};
