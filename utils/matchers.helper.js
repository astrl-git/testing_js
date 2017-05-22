beforeEach(function () {
    var _ = require('lodash');

    // String constants
    var FAIL_PREFIX = "[Fail] ";
    var ACTUAL = "\n\tActual result\t: ";
    var EXPECTED = "\n\tExpected result\t: ";
    var NOT = "NOT ";

    // Add custom matchers to jasmine
    jasmine.addMatchers({
        toHaveStatusCode: function () {
            return {
                compare: function (response, expectedValue) {
                    var result = {};
                    var actualResponse = _.cloneDeep(response);
                    var actualValue = actualResponse.statusCode;

                    if (typeof actualResponse.statusCode === 'undefined') {
                        result.pass = false;
                        result.message = FAIL_PREFIX + "No statusCode property in response";
                        return result
                    }

                    result.pass = actualValue === expectedValue;
                    result.message = FAIL_PREFIX + "Status code " + EXPECTED + (result.pass ? NOT : '') + expectedValue + ACTUAL + actualValue;
                    return result;
                }
            };
        },
        toHaveProperty: function () {
            return {
                compare: function (response, expectedValue) {
                    var result = {};
                    var actualResponse = _.cloneDeep(response);
                    var actualValue = actualResponse[expectedValue];

                    result.pass = typeof actualValue !== 'undefined';
                    result.message = FAIL_PREFIX + "Property " + EXPECTED + "Should " + (result.pass ? NOT : '') + "have property: " + expectedValue;
                    return result;
                }
            };
        },
        toHavePath: function () {
            return {
                compare: function (response, expectedValue) {
                    var result = {};
                    var actualResponse = _.cloneDeep(response);
                    var actualValue = _.has(actualResponse, expectedValue);

                    result.pass = actualValue;
                    result.message = FAIL_PREFIX + "JSON path " + EXPECTED + "Should " + (result.pass ? NOT : '') + "match JSON path: " + expectedValue;
                    return result;
                }
            };
        },
        toHaveValue: function () {
            return {
                compare: function (response, path, expectedValue) {
                    var result = {};
                    var actualResponse = _.cloneDeep(response);
                    var actualValue = _.get(actualResponse, path);

                    result.pass = actualValue === expectedValue;
                    result.message = FAIL_PREFIX + "Value by path: " + path + EXPECTED + (result.pass ? NOT : '') + expectedValue + ACTUAL + actualValue;
                    return result;
                }
            };
        },
        toHasSameValue: function () {
            return {
                compare: function (response, path, comparableObject) {
                    var result = {};
                    var actualResponse = _.cloneDeep(response);
                    var comparableResponse = _.cloneDeep(comparableObject);
                    var actualValue = _.get(actualResponse, path);
                    var comparableValue = _.get(comparableResponse, path);

                    if (!_.has(actualResponse, path)) {
                        result.pass = false;
                        result.message = FAIL_PREFIX + "No property by path: " + path + " in response";
                        return result
                    }
                    if (!_.has(comparableResponse, path)) {
                        result.pass = false;
                        result.message = FAIL_PREFIX + "No property by path: " + path + " in response to compare";
                        return result
                    }

                    result.pass = actualValue === comparableValue;
                    result.message = FAIL_PREFIX + "Value by path: " + path + EXPECTED + (result.pass ? NOT : '') + comparableValue + ACTUAL + actualValue;
                    return result;
                }
            };
        },
        valueMatchRegExp: function () {
            return {
                compare: function (response, path, regExp) {
                    var result = {};
                    var actualResponse = _.cloneDeep(response);
                    var actualValue;

                    if (!_.has(actualResponse, path)) {
                        result.pass = false;
                        result.message = FAIL_PREFIX + "No property by path: " + path + " in response";
                        return result
                    }

                    actualValue = _.get(actualResponse, path);

                    result.pass = regExp.test(actualValue);
                    result.message = FAIL_PREFIX + "Value by RegExp in path: " + path + EXPECTED + "Value: " + actualValue + " should " + (result.pass ? NOT : '') + "match regExp: " + regExp;

                    return result;
                }
            };
        },
        toHasItemsCount: function () {
            return {
                compare: function (response, path, count) {
                    var result = {};
                    var actualResponse = _.cloneDeep(response);
                    var itemForChecking = _.get(actualResponse, path);
                    var actualValue;

                    if (!_.has(actualResponse, path)) {
                        result.pass = false;
                        result.message = FAIL_PREFIX + "No property by path: " + path + " in response";
                        return result
                    }

                    if (Array.isArray(itemForChecking) && _.has(actualResponse, path)) {
                        actualValue = itemForChecking.length;
                        result.pass = actualValue === parseInt(count);
                    } else {
                        result.pass = false;
                        result.message = FAIL_PREFIX + "item by path: " + path + " isn't Array";
                        return result
                    }

                    result.message = FAIL_PREFIX + "Items count in Array by path: " + path + EXPECTED + (result.pass ? NOT : '') + count + ACTUAL + actualValue;
                    return result;
                }
            };
        }
    });
});
