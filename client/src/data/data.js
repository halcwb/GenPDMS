/**
 * @module data/data
 * Contains demo/test data
 */



(function () {
    "use strict";

    /**
     * Demo/test data
     * @type {data}
     */
    exports.data =  {
        'action': {
            reqResp: [
                {
                    req: {},
                    resp: { succ: true, result: {}  }
                }
            ]
        },
        'patients': {
            reqResp: [
                {
                    req: {},
                    resp: { succ: true, result: { patients: [
                        { name: 'John Cedar' },
                        { name: 'Frederick Maple' },
                        { name: 'Christine Damian' },
                        { name: 'Eric Underwood' }
                    ]}  }
                }
            ]
        }
    };

})();

