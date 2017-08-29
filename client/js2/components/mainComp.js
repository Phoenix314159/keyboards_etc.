angular.module('ecom').component('mainComp', {
    templateUrl: './views/mainComp.html',
    controllerAs: 'main',
    controller: function ($http, mainService, $state) {
        let vm = this;
        vm.checkLogin = () => {
            mainService.checkLogin().then(response => {
                if (response.data.user) {
                    vm.user = true;
                }
            })
        }
        vm.checkLogin();
        vm.logged = () => {
            if (vm.user) {
                return true;
            }
        }
        vm.logout = () => {
            mainService.logout().then(response => {
                vm.data = response.data;
                vm.user = false;
                $state.go('home');
            })
        }
    }
})
