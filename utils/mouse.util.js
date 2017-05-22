module.exports = function () {
    /**
     * Left click on element and his coordinates
     * @param {Control} element - web element that will be clicked
     * @param {Object} coordinates - object that contains values x, y in pixels. coordinates from top left element's angle
     * @param {number} startpoint.x
     * @param {number} startpoint.y
     * @returns {!webdriver.promise.Promise}
     */
    this.click = function (element, coordinates) {
        return getVisible(element)
            .then(function (visibleElement) {
                return browser.actions()
                    .mouseMove(visibleElement, coordinates)
                    .click()
                    .perform();
            });
    };

    /**
     * Right click on element and his coordinates
     * @param {Control} element - web element that will be clicked
     * @param {Object} coordinates - object that contains values x, y in pixels. coordinates from top left element's angle
     * @param {number} startpoint.x
     * @param {number} startpoint.y
     * @returns {!webdriver.promise.Promise}
     */
    this.rightClick = function (element, coordinates) {
        return getVisible(element)
            .then(function (visibleElement) {
                return browser.actions()
                    .mouseMove(visibleElement, coordinates)
                    .click(protractor.Button.RIGHT)
                    .perform();
            });
    };

    /**
     * Double click on element and his coordinates
     * @param {Control} element - web element that will be clicked
     * @param {Object} coordinates - object that contains values x, y in pixels. coordinates from top left element's angle
     * @param {number} startpoint.x
     * @param {number} startpoint.y
     * @returns {!webdriver.promise.Promise}
     */
    this.doubleClick = function (element, coordinates) {
        return getVisible(element)
            .then(function (visibleElement) {
                return browser.actions()
                    .mouseMove(visibleElement, coordinates)
                    .doubleClick()
                    .perform();
            });
    };

    /**
     * Press right mouse button on element and drag it
     * @param {Control} startElement - start point web element that will be clicked
     * @param {Object} startpoint - object that contains values x, y in pixels - coordinates from top left start element's angle
     * @param {number} startpoint.x
     * @param {number} startpoint.y
     * @param {Control} endElement - end point web element
     * @param {Object} endpoind - object that contains values x, y in pixels - coordinates from top left end element's angle
     * @param {number} endpoind.x
     * @param {number} endpoind.y
     * @returns {!webdriver.promise.Promise}
     */
    this.drag = function (startElement, startpoint, endElement, endpoind) {
        return getVisible(startElement)
            .then(function (visibleStartElement) {
                return browser.actions()
                    .mouseMove(visibleStartElement, startpoint)
                    .mouseDown()
                    .perform();
            })
            .then(function () {
                    return getVisible(endElement)
            })
            .then(function (visibleEndElement) {
                return browser.actions()
                    .mouseMove(visibleEndElement, endpoind)
                    .perform();
            });
    };

    /**
     * Unpress right mouse button after dragging
     * @returns {!webdriver.promise.Promise}
     */
    this.drop = function () {
        return browser.actions()
            .mouseUp()
            .perform();
    };

    /**
     * Press right mouse button on element drag and drop it
     * @param {Control} startElement - start point web element that will be clicked
     * @param {Object} startpoint - object that contains values x, y in pixels - coordinates from top left start element's angle
     * @param {number} startpoint.x
     * @param {number} startpoint.y
     * @param {Control} endElement - end point web element
     * @param {Object} endpoind - object that contains values x, y in pixels - coordinates from top left end element's angle
     * @param {number} endpoind.x
     * @param {number} endpoind.y
     * @returns {!webdriver.promise.Promise}
     */
    this.dragAndDrop = function (startElement, startpoint, endElement, endpoind) {
        return getVisible(startElement)
            .then(function (visibleStartElement) {
                return browser.actions()
                    .mouseMove(visibleStartElement, startpoint)
                    .mouseDown()
                    .perform()
            })
            .then(function () {
                return getVisible(endElement)
            })
            .then(function (visibleEndElement) {
                return browser.actions()
                    .mouseMove(visibleEndElement, endpoind)
                    .mouseUp()
                    .perform();
            });
    };

    /**
     * Move mouse in X and Y coordinate axis
     * @param {Control} startElement - start point web element
     * @param {Object} coordinates
     * @param {number} coordinates.x
     * @param {number} coordinates.y
     * @returns {!webdriver.promise.Promise}
     */

    this.move = function (startElement, coordinates) {
        return getVisible(startElement)
            .then(function (visibleStartElement) {
                return browser.actions()
                    .mouseMove(visibleStartElement, coordinates)
                    .perform()
            });
    };

    /**
     * Returns visible control's elementFinder element
     * @param {Control} element
     * @returns {!webdriver.promise.Promise.<ElementFinder>}
     */
    function getVisible(element) {
        return element.isVisibility(true)
            .then(function () {
                return element.getElementFinder()
            });
    }
};