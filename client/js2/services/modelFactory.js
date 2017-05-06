angular.module('ecom').factory('modelFactory', () => {
       const state = {
           data: {
               msg: ''
           }
       };
    return {
        get() {
            return state.data;
        },
        set(data) {
            Object.assign(state.data, data);
        }
    };
});
