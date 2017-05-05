angular.module('ecom').component('login', {
    templateUrl: './views/login.html',
    controller: function (mainService) {
        let vm = this;
        vm.login = () => {
            mainService.login(vm.username, vm.password).then(response => {

            })
        }

    }
})
