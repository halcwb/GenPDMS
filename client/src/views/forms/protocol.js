/**
 * @module views/forms/protocol
 */

(function () {
    "use strict";

    var id = 'protocolForm',
        labelWidth = 100,
        view = {
            view: 'form',
            id: id,
            elements: [
                { rows: [
                    { template: 'Protocol Details', type: 'section' },
                    {
                        view: "text",
                        label: 'Id',
                        placeholder: 'Id',
                        name: 'id',
                        labelAlign: 'right',
                        labelWidth: labelWidth
                    },
                    {
                        view: "text",
                        label: 'Name',
                        placeholder: 'Protocol Name',
                        name: 'name',
                        labelAlign: 'right',
                        labelWidth: labelWidth
                    },
                    { template: '', height: 20 },
                    {
                        cols: [
                            { template: '' },
                            {
                                view: 'button',
                                id: id + '.new',
                                tooltip: 'Enter a new protocol',
                                value: 'New',
                                width: 75
                            },
                            {
                                view: 'button',
                                id: id + '.edit',
                                value: 'Edit',
                                tooltip: 'Change exisiting protocol',
                                type: 'form',
                                width: 75
                            },
                            {
                                view: 'button',
                                id: id + '.save',
                                value: 'Save',
                                tooltip: 'Save protocol',
                                width: 75
                            }
                        ]
                    }
                ]}
            ]
        };

    exports.getId = function () { return id; };

    exports.getView = function (app) {
        app.debug('client:' + id + 'getView')(view);
        return view;
    };

    exports.init = function (app) {
        var debug = app.debug('client:' + id + ':init');

        app.util.publishButton({
            id: id,
            app: app,
            debug: debug
        });

        debug('init');
    };

})();