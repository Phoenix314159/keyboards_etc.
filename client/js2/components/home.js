angular.module('ecom').component('home', {
    templateUrl: './views/home.html',
    controller: function () {
        let vm = this;
        vm.subscribe = () => {
            alert(`Thank you for subscribing ${vm.name}`)
        }
    }
})
