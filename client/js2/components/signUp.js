angular.module('ecom').component('signUp', {
    templateUrl: './views/signUp.html',
    bindings: {
        view: '<'
    },
    controller: function (mainService, $timeout, $state) {
        let vm = this;
        vm.addNewUser = () => {
            mainService.signUp(vm.firstname, vm.lastname, vm.email, vm.username, vm.password).then(response => {

            })
        }
        vm.show = true;
        vm.goHome = () => {
            vm.show = false;
            vm.number = 3;
            $timeout(() => {
                vm.number = 2;
                $timeout(() => {
                    vm.number = 1;
                    $timeout(() => {
                    }, 1000)
                }, 2000)
                $state.go('home');
            }, 3000)

        }
    }
})
