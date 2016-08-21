/**
 * module views/windows/tooltip
 */

/* global webix */

(function () {
    "use strict";

    var id = 'windows.tooltip';

    exports.id = function () { return id; };


    exports.init = function (app) {
        app.debug('client:' + id)('init');

        webix.ui({
            id: id,
            view: 'tooltip',
            template: '#text#',
            height: 100
        });
    };

})();