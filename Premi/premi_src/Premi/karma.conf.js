// Karma configuration
// Generated on Mon May 25 2015 19:19:24 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath : './',

    files : [
      'public/lib/jquery/jquery.js',
      'public/lib/angular/angular.js',
      'public/lib/angular-animate/angular-animate.js',
      'public/lib/angular-aria/angular-aria.js',
      'public/lib/angular-material/angular-material.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'public/lib/angular-touch/angular-touch.js',
      'public/lib/angular-route/angular-route.js',
      'public/lib/cytoscape/dist/cytoscape.js',
      'public/modules/premi/app/app.module.js',
      'public/modules/premi/app/directives/directives.module.js',
      'public/modules/premi/app/services/services.module.js',
      'public/modules/premi/app/controllers/controllers.module.js',
      'public/modules/premi/app/*.js',
      'public/modules/premi/app/controllers/**/*.js',
      'public/modules/premi/app/directives/**/*.js',
      'public/modules/premi/app/model/**/*.js',
      'public/modules/premi/app/services/**/*.js',
      'public/modules/premi/app/views/**/*.js',
      'public/modules/premi/test/unit/AppRouter/**/*.js',
      'public/modules/premi/test/unit/controllers/**/*.js',
      'public/modules/premi/test/unit/model/**/*.js',
      'public/modules/premi/test/unit/services/**/*.js',
      'public/modules/premi/test/integration/**/*.js'
    ],
    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'public/modules/premi/app/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'report/front-end'
    },

    plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher',
        'karma-coverage'
    ],
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
