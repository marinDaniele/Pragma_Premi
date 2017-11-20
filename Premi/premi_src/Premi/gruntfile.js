'use strict';

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/modules/premi/**/*.js', '!public/modules/premi/assets/**/*.js'],
		clientCSS: ['public/modules/premi/app/assets/css/*.css', '!public/modules/premi/app/assets/css/cytoscape.css',
            'public/modules/premi/app/assets/css/angular-material.min.css'],
		mochaTests: ['tests/integration/**/*.js','tests/unit/**/*.js']
	};


	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		notify_hooks: {
			options: {
				enabled: true,
				title: "Premi - Test",
				success: true, // whether successful grunt executions should be notified automatically
				duration: 3 // the duration of notification in seconds, for `notify-send only
			}
		},
		sloc: {
			backend: {
				files: {
					'./app': ['**.js']
				}
			},
			frontend: {
				files: {
					'./public/modules/premi/app': ['**.js']
				}
			},
			all: {
				files: {
					'./public/modules/premi/app': ['**.js'],
					'./app': ['**.js']
				}
			}
		},
		watch: {
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			},
			codemetrics: {
				files: ['app/**/*.js', 'public/modules/premi/app/**/*.js'],
				tasks: ['sloc:frontend', 'sloc:backend']
			}

		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		uglify: {
			production: {
				options: {
					mangle: false
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': '<%= applicationCSSFiles %>'
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		ngAnnotate: {
			production: {
				files: {
					'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			},
			secure: {
				NODE_ENV: 'secure'
			},
			release: {
				NODE_ENV: 'release'
			}
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		complexity: {
			generic: {
				src: ['app/**/*.js', 'public/modules/premi/app/**/*.js'],
				options: {
					breakOnErrors: true,
					jsLintXML: './report/complexity/report.xml',         // create XML JSLint-like report
					checkstyleXML: './report/complexity/checkstyle.xml', // create checkstyle report
					pmdXML: './report/complexity/pmd.xml',               // create pmd report
					errorsOnly: false,               // show only maintainability errors
					cyclomatic: 0/*4*/,          // or optionally a single value, like 3
					halstead: 0/*[15, 13, 20]*/,           // or optionally a single value, like 8
					maintainability: 171,
					hideComplexFunctions: false,     // only display maintainability
					broadcast: true                 // broadcast data over event-bus
				}
			}
		},
		shell: {
	        docs: {
	            command: 'bash r2d2.sh'
        	}
    	},
    	 mocha_istanbul: {
            coverage: {
                src: [
                'tests/unit/controllers/*/*/*/*.js',
                'tests/unit/models/*/*/*.js',
                'tests/unit/routers/*/*/*.js',
                'tests/unit/server/TU1/start.js',
                'tests/unit/controllers/ErrorHandler/TU5/handle.js',
                'tests/unit/controllers/NotFoundHandler/TU6/handle.js',
                'tests/unit/controllers/StaticController/TU7/getUserManual.js',
                'tests/integration/*/*.js'
                ] // a folder works nicely
            }
        }
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-complexity');
	grunt.loadNpmTasks('grunt-sloc');
	grunt.loadNpmTasks('grunt-mocha-cov');
	grunt.loadNpmTasks('grunt-mocha-istanbul');
	//Task per le notifiche fighe
	grunt.loadNpmTasks('grunt-notify');

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config');

		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// Default task(s).
	grunt.registerTask('default', ['env:release',/*'lint',*/ 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin']);

	// Test task + coverage frontEnd task
	grunt.registerTask('test', ['env:test', 'notify_hooks', 'mochaTest'/*, 'karma:unit'*/]);

	grunt.registerTask('metriche',['complexity', 'sloc:backend:files','sloc:frontend:files','sloc:all:files']);

	grunt.registerTask('coverage', ['env:test','mocha_istanbul:coverage']);

	//compila la documentazione
	grunt.registerTask('docs', ['shell:docs']);
};
