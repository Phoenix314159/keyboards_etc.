angular.module('ecom').component('login', {
    templateUrl: './views/login.html',
    require: {
        main: '^mainComp'
    },
    controller: function (mainService, $timeout, $state) {
        let vm = this;

        vm.login = () => {
            mainService.login(vm.username, vm.password).then(response => {  //login user
                console.log(response);
                mainService.deleteAllFromCart().then(response => {  //delete all products from previous cart
                })
                mainService.getCustomerInfo().then(response => {  //get customers first name
                    vm.name = response.data.firstname;
                    vm.check();
                })
            })
        }
        vm.$onInit = () => {
            vm.check = () => {
                vm.main.checkLogin()
            }
        }
        vm.show = true;  //show cart initially
        vm.goHome = () => {
            vm.show = false;  //show redirect countdown
            vm.number = 3;
            $timeout(() => {
                vm.number = 2;
                $timeout(() => {
                    vm.number = 1;
                    $timeout(() => {
                    }, 1000)
                }, 2000)
                $state.go('home');  //go to home state
            }, 3000)
        }
    }
})
