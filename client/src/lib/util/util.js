/**
 * @module lib/util/util
 */


(function () {
    "use strict";

    var util = require('util');

    util.numberParser = require('./numberParser.js');
    util.publishButton = require('./publishButton.js');

    /**
     * Util functions
     * @property util {util} - Utility library
     */
    module.exports = util;

})();