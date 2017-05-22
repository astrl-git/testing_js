module.exports = (function () {
    var _ = require('lodash');
    var rp = require('request-promise');

    // methods
    var GET = 'GET';
    var POST = 'POST';
    var PUT = 'PUT';
    var DELETE = 'DELETE';

    /**
     * An Object that helps to build correct request
     * @param {string} method
     * @constructor
     */
    function RequestMaker(method) {
        /**
         * Options object that will send as request
         */
        var optionToRequest = {
            method: method,
            headers: {
                'User-Agent': 'API-test-request'
            },
            resolveWithFullResponse: true,
            json: true
        };

        /**
         * Factory method for setting url to request
         * @param {string} url
         * @returns {RequestMaker}
         */
        this.url = function (url) {
            optionToRequest.uri = url;
            return this;
        };

        /**
         * Factory method for setting (add / override) headers object to request
         * @param {Object} header_object
         * @param {boolean} override
         * @returns {RequestMaker}
         */
        this.headers = function (header_object, override) {
            optionToRequest.headers = override ? header_object : _.merge(optionToRequest.headers, header_object);
            return this;
        };

        /**
         * Factory method for setting (add / override) body object to request
         * @param {Object} body_object
         * @param {boolean} override
         * @returns {RequestMaker}
         */
        this.body = function (body_object, override) {
            optionToRequest.body = override ? body_object : _.merge(optionToRequest.body, body_object);
            return this;
        };

        /**
         * Factory method for setting any property to request
         * @param {string} property
         * @param {string} value
         * @returns {RequestMaker}
         */
        this.setProperty = function (property, value) {
            optionToRequest[property] = value;
            return this;
        };

        /**
         * Final factory method for sending request
         * @returns {Object} - request-promise lib
         */
        this.send = function () {
            return rp(optionToRequest);
        }
    }

    return {
        'get': function (url) {
            return new RequestMaker(GET).url(url);
        },
        'post': function (url) {
            return new RequestMaker(POST).url(url);
        },
        'put': function (url) {
            return new RequestMaker(PUT).url(url);
        },
        'delete': function (url) {
            return new RequestMaker(DELETE).url(url);
        }
    };
}());

