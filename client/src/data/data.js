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
                        { name: 'John Cedar', dob: '3/11/1967' },
                        { name: 'Frederick Maple', dob: '3/11/1967'  },
                        { name: 'Christine Damian', dob: '3/11/1967'  },
                        { name: 'Eric Underwood', dob: '3/11/1967'  }
                    ]}  }
                }
            ]
        }
    };

})();

