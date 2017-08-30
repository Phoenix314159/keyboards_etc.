angular.module('ecom').component('mainComp', {
    templateUrl: './views/mainComp.html',
    controllerAs: 'main',
    controller: function ($http, mainService, $state) {
        let vm = this;
        vm.checkLogin = async () => {
            let response = await mainService.checkLogin();
                if (await response.data.user) {
                    vm.user = true;
                }
        }
        vm.checkLogin();

        vm.logged = () => {
            if (vm.user) {
                return true;
            }
        }
        vm.logout = async () => {
            let response2 = mainService.logout();
                vm.data = await response2.data;
                vm.user = await false;
                await $state.go('home');
        }
    }
})
