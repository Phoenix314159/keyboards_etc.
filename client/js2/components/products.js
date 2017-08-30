angular.module('ecom').component('products', {
    templateUrl: './views/products.html',

    controller: function (mainService, $stateParams) {
        let vm = this,
            getCustomerInfo = async () => { //gets customer info to obtain customer id
            let response = await mainService.getCustomerInfo();
            vm.customer = await response.data;
            }
        getCustomerInfo();

        vm.getProductsByType = async () => {
            let response2 = mainService.getProductsByType($stateParams.type);
                vm.products = await response.data;
        };
        vm.getProductsByType();

        vm.addToCart = async productId => {  //adds product to cart dependent on customer id
            await mainService.addToCart(vm.customer.id, productId, 1);
        }
    }
})
