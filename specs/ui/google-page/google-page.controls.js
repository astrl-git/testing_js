function GooglePageControls () {
	var _this = this;
	var webElement = test_imports.testUtils.webElementUtil();
	
	this.searchInputField = webElement.get(by.xpath("//input[@name='q']"), "Search Input Field");
	this.searchButton = webElement.get(by.xpath("//button[@name='btnG']"), "Search Button");
	
	this.resultList = webElement.all(by.xpath("//h3"), "Results List");
}

module.exports = GooglePageControls