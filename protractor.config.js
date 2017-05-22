var Imports = require(__dirname + '/utils/imports.repository.js');
global.test_root = __dirname;
global.test_imports = new Imports();

exports.config = {
    specs: 'specs/ui/**/*.spec.js',
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--window-size=1064,800']
        },
        loggingPrefs: {
            'browser': 'WARNING'
        }
    },
    allScriptsTimeout: 300000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 300000
    },
    framework: 'jasmine2',
    onPrepare: function () {
		browser.ignoreSynchronization = true;
		
        // disable animations when testing
        var disableAnimation = function () {
			// disable css animations
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = '* {' +
				'-webkit-transition: none !important;' +
				'-moz-transition: none !important;' +
				'-o-transition: none !important;' +
				'-ms-transition: none !important;' +
				'transition: none !important;' +
				'}';
			document.getElementsByTagName('head')[0].appendChild(style);

			// disable angular ng animations
			$animate.enabled(false);
        };

        browser.addMockModule('disableAnimation', disableAnimation);
    }
};
