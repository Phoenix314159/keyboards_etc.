angular.module('ecom').directive('buttonD', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            elem.on('click', function () {
                elem.html("ADDED TO CART");
            })
        }
    }
})
