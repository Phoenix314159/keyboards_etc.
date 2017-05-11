angular.module('ecom').factory('modelFactory', () => {
    let total = [],

        displayTotal = t => {
            total.push(t);
            console.log(total[0]);
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
