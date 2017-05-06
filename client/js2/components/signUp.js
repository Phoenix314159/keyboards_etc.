angular.module('ecom').component('signUp', {
    templateUrl: './views/signUp.html',
    bindings: {
        view: '<'
    },
    controller: function (mainService) {
        let vm = this;
        vm.addNewUser = () => {
            mainService.signUp(vm.firstname, vm.lastname, vm.email, vm.username, vm.password).then(response => {
            })
        }
    }
})