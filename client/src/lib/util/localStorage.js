/**
 * @module lib/util/localStorage
 */

/*global localStorage */

(function () {
    "use strict";

    exports.setItem = function (key, value) {
        if (localStorage) {
            localStorage.setItem(key, value);
        }
    };

    exports.getItem = function (key) {
        if (localStorage) {
            return localStorage.getItem(key);
        } else {
            return undefined;
        }
    };

})();