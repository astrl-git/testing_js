describe('google page', function () {
	var googlePage = test_imports.pageObject.googlePage();
	var browserUtil = test_imports.testUtils.browserUtil();
	
	beforeEach(function () {
        browser.get('https://www.google.com');
    });
	
	it('should search', function() {
		text = 'selenium'
		googlePage.typeToSearchInputFiald(text);
		googlePage.clickOnSearchButton();
		
		browserUtil.waitForCondition('page to be reloaded', function(){
			return browser.getTitle().then(function(title){
				return title.indexOf(text) >= 0;
			})
		});
		
		expect(googlePage.getResultList()).toEqual(['Should', 'be', 'fail']);
	})
})