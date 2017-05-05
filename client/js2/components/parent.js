angular.module('ecom').component('mainComp', {

    controller: function (mainService) {
        let vm = this;
        vm.hiya = function () {
            return 'Hiya from parent!';
        };

        vm.getProducts = () => {
            mainService.getProducts().then(response => {
                vm.products = response.data;
                console.log(vm.products);
            })
            return vm.products;
        }

        vm.addToCart = function (productId) {
            mainService.addToCart(1, productId, 1).then(response => {
            })
        }
    }
})
