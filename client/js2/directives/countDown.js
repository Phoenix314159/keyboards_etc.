angular.module('ecom').directive('countDown', function ($timeout) {
    return {
        restrict: "A",
        template: '<div>{{number}}</div>',
        link: (scope, element, attrs) => {
            scope.number = 3;
            $timeout(() => {
                scope.number = 2;
                $timeout(() => {
                    scope.number = 1;
                    $timeout(() => {
                    }, 1000)
                }, 1000)
            }, 1000)
        }
    }
});


