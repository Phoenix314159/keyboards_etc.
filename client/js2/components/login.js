angular.module('ecom').component('login', {
    templateUrl: './views/login.html',
    require: {
        main: '^mainComp'
    },
    controller: function (mainService, $timeout, $state) {
        let vm = this;

        vm.login = async () => {
            await mainService.login(vm.username, vm.password);  //login user
            await mainService.deleteAllFromCart();  //delete all products from previous cart
            let response = await mainService.getCustomerInfo();
            vm.name = await response.data.firstname; //get customers first name
            await vm.check();
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
