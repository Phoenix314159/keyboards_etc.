angular.module('ecom').component('productDetails', {
    templateUrl: './views/product-details.html',

    controller: function (mainService, $stateParams) {
        let vm = this;
        vm.getProducts = async () => {
            const response = await mainService.getProducts(); //gets list of products to display
            vm.products = await response.data;
            vm.product1 = await $stateParams.id;
        }
        vm.getProducts();

        let getProductBtId = async () => {
            const response2 = await mainService.getProductById();
            vm.product = await response2.data[0];
        }

        getProductBtId();

        let getCustomerInfo = async () => { //gets customer info to obtain customer id
            const response3 = await mainService.getCustomerInfo();
            vm.customer = await response3.data;
        }

        getCustomerInfo();

        vm.addToCart = async (productId) => {  //adds product to cart dependent on customer id
            await mainService.addToCart(vm.customer.id, productId, 1);
        }
    }
})
