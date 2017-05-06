angular.module('ecom').component('login', {
    templateUrl: './views/login.html',

    bindings: {
        loggedIn: '=',
    },
    controller: function (mainService) {
        let vm = this;
         vm.loggedIn = false;
        vm.login = () => {
            mainService.login(vm.username, vm.password).then(response => {
                vm.loggedIn = true;
            })
        }
    }
})
