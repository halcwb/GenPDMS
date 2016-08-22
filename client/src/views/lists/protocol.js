/**
 * @module views/lists/protocol
 */

/*global webix, $$ */

(function () {
    "use strict";

    var id = 'lists.protocol',
        view =  {
            view: 'datatable',
            id: id,
            resizeColumn: true,
            select: 'row',
            columns: [
                { id: 'id', header: 'Id', sort: 'string' },
                { id: 'name', header: 'Name', fillspace: true, sort: 'string' }
            ],
            data: [
                { id: '1', name: 'Pain' },
                { id: '2', name: 'Blood Pressure' }
            ]
        };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + ':view')(view);

        return view;
    };

    exports.init = function (app) {
        webix.ui({
            view: 'contextmenu',
            data: [
                'Add',
                'Remove'
            ]
        }).attachTo($$(id));


        app.debug('client:' + id + ':init')('init');
    };

})();