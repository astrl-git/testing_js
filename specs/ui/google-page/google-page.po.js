function GooglePageControls () {
	var controls = test_imports.controlsObject.googlePage();
	
	/**
	 * Type given text value to search input field
	 * @param {string} text
	 * @retrns {!webdriver.promise.Promise}
	 */
	this.typeToSearchInputField = function (text){
		return controls.searchInputField.sendKeys(text);
	};
	
	/**
	 * Click on search button
	 * @retrns {!webdriver.promise.Promise}
	 */
	this.clickOnSearchButton = function(){
		return controls.searchButton.click();
	};
	
	/**
	 * Return a list of search result text values
	 * @retrns {!webdriver.promise.Promise<Array>}
	 */
	this.getResultList = function(){
		return controls.resultList.getVisibleTextList();
	};
	
	/**
	 * Return a list of search result text values
	 * @retrns {!webdriver.promise.Promise<Array>}
	 */
	this.getFirstResultItemTextValue = function(){
		return controls.resultList.getFirst().getText();
	};
}

module.exports = GooglePageControls
