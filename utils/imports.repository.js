function ImportsRepository () {
	this.pageObject = {
		googlePage: function () {
			var googlePage = require(test_root + '/specs/ui/google-page/google-page.po.js');
			return new googlePage();
		}
	};
	
	this.controlsObject = {
		googlePage: function () {
			var googlePage = require(test_root + '/specs/ui/google-page/google-page.controls.js');
			return new googlePage();
		}};
	
	this.testUtils = {
		webElementUtil: function () {
            var webElementUtil = require(test_root + '/utils/web-element.util.js');
            return new webElementUtil();
        },
		keyboardUtil: function () {
            var keyboardUtil = require(test_root + '/utils/keyboard.util.js');
            return new keyboardUtil();
        },
		mouseUtil: function () {
            var mouseUtil = require(test_root + '/utils/mouse.util.js');
            return new mouseUtil();
        },
		browserUtil: function () {
            var browserUtil = require(test_root + '/utils/browser.util.js');
            return new browserUtil();
        }
	};
	
}

module.exports = ImportsRepository
