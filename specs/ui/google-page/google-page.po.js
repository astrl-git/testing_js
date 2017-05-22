function GooglePageControls () {
	var controls = test_imports.controlsObject.googlePage();
	
	/**
	 * Type given text value to search input field
	 * @param {string} text
	 * @retrns {!webdriver.promise.Promise}
	 */
	this.typeToSearchInputFiald = function (text){
		return controls.searchInputField.click().then(function(){
			return controls.searchInputField.sendKeys(text);
		});
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
}

module.exports = GooglePageControls
