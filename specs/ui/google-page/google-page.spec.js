describe('google page', function () {
	var googlePage = test_imports.pageObject.googlePage();
	var browserUtil = test_imports.testUtils.browserUtil();
	var keyboardUtil = test_imports.testUtils.keyboardUtil();
	
	beforeEach(function () {
        browserUtil.get('https://www.google.com');
    });
	
	it('should search', function() {
		text = 'Selenium'
		googlePage.typeToSearchInputField(text);
		keyboardUtil.pressButtons(keyboardUtil.Button.ENTER);
		
		browserUtil.waitForCondition('page to be reloaded', function(){
			return browser.getTitle().then(function(title){
				return title.indexOf(text) >= 0;
			})
		});
		
		expect(googlePage.getFirstResultItemTextValue()).toContain(text);
	})
})