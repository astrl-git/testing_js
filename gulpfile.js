var gulp = require('gulp');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');

var gulp_protractor = require("gulp-protractor").protractor;
var webdriver_update = require("gulp-protractor").webdriver_update;
var Jasmine = require('jasmine');
var jasmineReporters = require('jasmine-reporters');

var protractorConfigFile = 'protractor.config.js';
var BROWSERS_COUNT = 3;

global.makeRequest = require(__dirname + '/utils/make-request.util.js');
    
/**
 * Get help
 */
gulp.task('help', function(){
    var green_col = '\n\x1b[32m';
    var yellow_col = '\n\x1b[33m';
    var norm_col = '\x1b[0m';
    console.info(green_col + 'gulp ui-test ' + norm_col + '\t\t- run ui testing'+
        yellow_col + '   --run-single ' + norm_col + '\t- run in one thread'+
        yellow_col + '   --spec-pattern ' + norm_col + '\t- run tests from given specs\n'+
        green_col + 'gulp api-test ' + norm_col + '\t\t- run api testing'+
        yellow_col + '   --spec-pattern ' + norm_col + '\t- run tests from given specs\n');
});

/**
 * Update web driver
 * Task for development environment only
 */
gulp.task('update-web-driver', webdriver_update);

/**
 * Run e2e tests (Protractor)
 */
gulp.task('ui-test', function () {
    console.info('ui-test started');
    var uiTestsLocation = 'specs/ui/'
    var arguments = [];
    var src = [];

    if (!argv['run-single']) {
        arguments.push('--capabilities.maxInstances');
        arguments.push(BROWSERS_COUNT);
        arguments.push('--capabilities.shardTestFiles');
        arguments.push(true);
    }

    if (argv['spec-pattern']) {
        var spec_patterns = argv['spec-pattern'].split(',');
        for (var pattern in spec_patterns) {
            src.push(uiTestsLocation + spec_patterns[pattern].trim() + '.spec.js');
        }
        console.info('Ran specs:\n' + src.join(',\n'));
    }

    return gulp.src(src)
        .pipe(gulp_protractor({
            configFile: protractorConfigFile,
            args: arguments
        }))
        .on('error', function (e) {
            var currentTime = new Date();
            console.error('[' +currentTime.getHours()+':'+currentTime.getMinutes()+':'+currentTime.getSeconds() + '] ');
            throw e;
        });
});

/**
 * Task for configuring and run jasmine environment for testing
 */
gulp.task('api-test', function (next) {
    console.info('api-test started');
    var apiTestsLocation = 'api/'
    var jasmine = new Jasmine();
    var src = [];

    // Specify tests to run
    if (argv['spec-pattern']) {
        argv['spec-pattern'].split(',').forEach(function (spec_pattern) {
            src.push(apiTestsLocation + spec_pattern.trim() + '.spec.js');
        });
        console.info('Ran specs:\n' + src.join(',\n'));
    }
    if(src.length < 1){
        src.push(apiTestsLocation + '**/*.spec.js');
    }

    jasmine.loadConfig({
        "spec_dir": "specs",
        "spec_files": src,
        "helpers": [
            "../utils/**/*.helper.js"
        ],
        "stopSpecOnExpectationFailure": false,
        "random": false
    });

    jasmine.addReporter(new jasmineReporters.JUnitXmlReporter({
        savePath: __dirname + '/test-output/api',
        filePrefix: 'tests-result'
    }));

    jasmine.execute();
    next()
});
