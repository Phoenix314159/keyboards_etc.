angular.module('ecom').component('mainComp', {

    controller: function ($scope) {
        let vm = this;
        vm.text = 'Login';
        vm.change = () => {
            return 'Welcome';
        }
    }
})
