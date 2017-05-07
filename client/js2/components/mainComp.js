angular.module('ecom').component('mainComp', {
    templateUrl: './views/mainComp.html',
    controllerAs: 'main',
    controller: function ($http, mainService, $state) {
        let serverUrl = 'http://localhost:3065',
            vm = this;
        vm.text = 'Login';
        vm.login = (username, password) => {
            vm.text = 'Logout';
            vm.loggedIn = true;
            return $http({
                method: 'POST',
                data: {username, password},
                url: serverUrl + '/api/login'
            })
        };


            vm.logout = () => {
                mainService.logout().then(response => {
                    vm.data = response.data;
                    console.log(vm.data);
                    vm.text = 'Login';
                    $state.go('home');
                })
            }



    }
})
