angular.module('ecom').directive('countDown2', function ($timeout) {
    return {
        restrict: "A",
        template: '<div>{{number}}</div>',
        link: (scope, element, attrs) => {
            scope.number = 10;
            $timeout(() => {
                scope.number = 9;
                $timeout(() => {
                    scope.number = 8;
                    $timeout(() => {
                        scope.number = 7;
                        $timeout(() => {
                            scope.number = 6;
                            $timeout(() => {
                                scope.number = 5;
                                $timeout(() => {
                                    scope.number = 4;
                                    $timeout(() => {
                                        scope.number = 3;
                                        $timeout(() => {
                                            scope.number = 2;
                                            $timeout(() => {
                                                scope.number = 1;
                                            }, 1000)
                                        }, 1000)
                                    }, 1000)
                                }, 1000)
                            }, 1000)
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }
    }
});
