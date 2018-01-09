module.exports = function () {
    var defaultWindowResolution = {width: 1064, height: 800};

    this.get = function (url) {
        console.log("Go to url: " + url)
        return browser.get(url);
    };

    /**
     * Returns browser's console logs
     * @returns {!webdriver.promise.Promise.<Array>}
     */
    this.getLogs = function () {
        return browser.manage().logs().get('browser');
    };

    /**
     *
     * Wait until given function returns true
     * @param {string} description - description of expectation
     * @param {function} condition - function that checks expected condition
     * @param {number | undefined} timeOut - count of milliseconds
     * @returns {!webdriver.promise.Promise}
     */
    this.waitForCondition = function (description, condition, timeOut) {
        timeOut = timeOut || 3000;
        console.log("Wait while "+ description + " (no longer than " + timeOut + "ms)")
        return browser.wait(condition, timeOut, description);
    };

    /**
     * Returns browser's console logs
     * @returns {!webdriver.promise.Promise.<Array>}
     */
    this.getTitle = function () {
        console.log("Get page title")
        return browser.getTitle();
    };

    /**
     * Perform page scrolling to given coordinates
     * @param {Object} coordinates - object that contains values x, y in pixels. coordinates from top left page's angle
     * @returns {!webdriver.promise.Promise}
     */
    this.scrollTo = function (coordinates) {
        return browser.waitForAngular()
            .then(function () {
                return browser.executeScript('window.scrollTo(' + coordinates.x + ', ' + coordinates.y + ');');
            })
    };

    /**
     * Run given script on browser
     * @param {string|function} script
     * @returns {!webdriver.promise.Promise}
     */
    this.executeScript = function (script) {
        return browser.waitForAngular()
            .then(function () {
                return browser.executeScript(script);
            })
    };

    /**
     * Resize browser's window to given resolution
     * @param {Object} newResolution - object that contains width and height values in pixels
     * @returns {!webdriver.promise.Promise}
     */
    this.resizeWindowTo = function (newResolution) {
        return browser.waitForAngular()
            .then(function () {
                return browser.driver.manage().window().setSize(newResolution.width, newResolution.height);
            })
    };

    /**
     * Resize browser's window to default resolution
     * @returns {!webdriver.promise.Promise}
     */
    this.resizeWindowToDefault = function () {
        return browser.waitForAngular()
            .then(function () {
                return browser.driver.manage().window().setSize(defaultWindowResolution.width, defaultWindowResolution.height);
            })
    };

    /**
     * Add cookies to browser
     * @param {{name: string, value: string, opt_path: (string|undefined), opt_domain: (string|undefined), opt_isSecure: (boolean|undefined), opt_expiry: (number|Date|undefined)}} cookie
     * @returns {!webdriver.promise.Promise}
     */
    this.addCookies = function (cookie) {
        return browser.manage().addCookie(cookie.name, cookie.value, cookie.opt_path, cookie.opt_domain, cookie.opt_isSecure, cookie.opt_expiry);
    };
};