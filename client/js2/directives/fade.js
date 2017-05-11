angular.module('ecom').directive('fade', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            elem.mouseleave(() => {
                elem.css({
                    'transition': '.750s',
                    'box-shadow': '0 0 0 0 rgba(0,0,0,0)',
                    'opacity':'0'
                });
            })
            elem.mouseenter(() => {
                elem.css({
                    'transition': '.750s',
                    'box-shadow': '0 2px 5px 0 rgba(0,0,0,.16)',
                    'opacity': '1'
                })
            })
        }
    }
});

