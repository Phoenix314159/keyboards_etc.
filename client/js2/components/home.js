angular.module('ecom').component('home', {
    templateUrl: './views/home.html',
    bindings: {
      loggedIn: '='
    },
    controller: function (mainService) {
        let vm = this;
        vm.subscribe = () => {
            alert(`Thank you for subscribing ${vm.name}`)
        }
        vm.addToCart = (productId) => {
            mainService.addToCart(1, productId, 1).then(response => {
            })
        }
    }
})
