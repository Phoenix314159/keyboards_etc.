angular.module('ecom').component('mainComp', {
    templateUrl: './views/mainComp.html',
    controllerAs: 'main',
     // bindings: {
     //   text: '@'
     // },
    controller: function () {
        let vm = this;
        // vm.loggedIn = false;
        // vm.login = () => {
        //     mainService.login(vm.username, vm.password).then(response => {
        //         vm.loggedIn = true;
        //         console.log(vm.parent)
        //     })
        // }
        // vm.state = modelFactory.get();
        vm.text = 'Login';
        if (vm.isLoggedIn) {
            vm.text = 'Welcome';

        }
    }
})
