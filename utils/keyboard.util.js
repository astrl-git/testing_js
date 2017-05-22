module.exports = function () {

    this.pressButtons = function (keyboardButton) {
        return browser.actions().sendKeys(keyboardButton).perform();
    };

    /**
     * Press given Button
     * @param {webdriver.Key} keyboardButton
     * @returns {!webdriver.promise.Promise}
     */
    this.keyDown = function (keyboardButton) {
        return browser.actions().keyDown(keyboardButton).perform();
    };

    /**
     * Press out given Button
     * @param {webdriver.Key} keyboardButton
     * @returns {!webdriver.promise.Promise}
     */
    this.keyUp = function (keyboardButton) {
        return browser.actions().keyUp(keyboardButton).perform();
    };

	this.Button = {
		CONTROL: protractor.Key.META || protractor.Key.CONTROL,
		ENTER: protractor.Key.ENTER,
		ARROW_RIGHT: protractor.Key.ARROW_RIGHT,
		ARROW_DOWN: protractor.Key.ARROW_DOWN,
		BACK_SPACE: protractor.Key.BACK_SPACE
	}
};
