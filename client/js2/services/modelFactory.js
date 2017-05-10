angular.module('ecom').factory('modelFactory', () => {
    let total = [];

    // function empty(t) {
    //     while (total.length > 0) {
    //         total.pop();
    //     }
    //     displayTotal(t);
    // }

    function displayTotal(t) {
        total.push(t);
    }

    function getTotal() {
        return total[0];
    }

    return {
        displayTotal: displayTotal,
        getTotal: getTotal
    };
});
