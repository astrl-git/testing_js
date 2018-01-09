module.exports = function () {

    this.pressButtons = function (keyboardButton) {
        console.log("Press button " + keyboardButton.name)
        return browser.actions().sendKeys(keyboardButton.key).perform();
    };

    /**
     * Press given Button
     * @param {webdriver.Key} keyboardButton
     * @returns {!webdriver.promise.Promise}
     */
    this.keyDown = function (keyboardButton) {
        return browser.actions().keyDown(keyboardButton.key).perform();
    };

    /**
     * Press out given Button
     * @param {webdriver.Key} keyboardButton
     * @returns {!webdriver.promise.Promise}
     */
    this.keyUp = function (keyboardButton) {
        return browser.actions().keyUp(keyboardButton.key).perform();
    };

	this.Button = {
		CONTROL: {name: 'CONTROL', key: protractor.Key.META || protractor.Key.CONTROL},
		ENTER: {name: 'ENTER', key: protractor.Key.ENTER},
		ARROW_RIGHT: {name: 'ARROW_RIGHT', key: protractor.Key.ARROW_RIGHT},
		ARROW_DOWN: {name: 'ARROW_DOWN', key: protractor.Key.ARROW_DOWN},
		BACK_SPACE: {name: 'BACK_SPACE', key: protractor.Key.BACK_SPACE}
	}
};
