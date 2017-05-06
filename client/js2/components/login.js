angular.module('ecom').component('login', {
    templateUrl: './views/login.html',

    // bindings: {
    //     loggedIn: '=',
    // },
    // require: {
    //     parent: '^mainComp'
    // },
    controller: function (mainService, $timeout, $state) {
        let vm = this;
        vm.$onInit = () => {
            vm.login = () => {
                mainService.login(vm.username, vm.password).then(response => {
                    mainService.getCustomerInfo().then(response => {
                        vm.name = response.data.firstname;
                        console.log(response.data.firstname)
                    })
                })
            }
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
