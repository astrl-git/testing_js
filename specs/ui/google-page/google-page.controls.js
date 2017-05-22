function GooglePageControls () {
	var _this = this;
	var webElement = test_imports.testUtils.webElementUtil();
	
	this.searchInputField = webElement.get(by.xpath("//input[@name='q']"));
	this.searchButton = webElement.get(by.xpath("//button[@name='btnG']"));
	
	this.resultList = webElement.all(by.xpath("//h3"));
}

module.exports = GooglePageControls