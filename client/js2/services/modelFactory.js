angular.module('ecom').factory('modelFactory', () => {
    let total = [],

        displayTotal = t => {
            total.push(t);
        },

        getTotal = () => {
            while (total.length > 1) {
                total.shift();
            }
            return total[0];
        }
    return {
        displayTotal: displayTotal,
        getTotal: getTotal
    };
});
