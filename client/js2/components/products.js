angular.module('ecom').component('products', {
    templateUrl: './views/products.html',

    controller: function (mainService, $stateParams) {
        let vm = this;

        mainService.getCustomerInfo().then(response => {
            vm.customer = response.data;  //gets customer info to obtain customer id
        })

        vm.getProductsByType = () => {
            mainService.getProductsByType($stateParams.type).then(response => {
                vm.products = response.data;
            })
        };
        vm.getProductsByType();

        vm.addToCart = productId => {  //adds product to cart dependent on customer id
            mainService.addToCart(vm.customer.id, productId, 1).then(response => {
            })
        }
    }
})
