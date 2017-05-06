angular.module('ecom').component('timeOut', {
    templateUrl: './views/user.html',
    controller: function ($timeout, $state) {
        let vm = this;
        vm.count = 3;
            $timeout(function () {
                $timeout(function () {
                    $timeout(function () {
                        vm.count = 1;
                    },1000)
                    vm.count = 2;
                },2000)
                $state.go('home');
            },3000)



    }
})
