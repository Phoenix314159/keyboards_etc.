angular.module('ecom').directive('fade', function () {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            elem.on('click', function () {
                elem.mouseenter(() => {
                    elem.fadeOut('slow');
                })
            })
            // elem.mouseenter( function() {
            //     elem.hide(4000);
            // })
        }
    }
});

