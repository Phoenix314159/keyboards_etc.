angular.module('ecom').component('productDetails', {
    templateUrl: './views/product-details.html',

    controller: function (mainService, $stateParams) {
        let vm = this;
        vm.getProducts = () => {
            mainService.getProducts().then(response => { //gets list of products to display
                vm.products = response.data;
                vm.product1 = $stateParams.id;
            })
        }
         vm.getProducts();

        mainService.getProductById().then(response => {
            vm.product = response.data[0];
        })

        // mainService.getProductsByType(vm.id).then(response => {
        //     vm.product2 = response.data;
        //     console.log(response.data);
        // })

        mainService.getCustomerInfo().then(response => {
            vm.customer = response.data;  //gets customer info to obtain customer id
        })

        vm.addToCart = (productId) => {  //adds product to cart dependent on customer id

            mainService.addToCart(vm.customer.id, productId, 1).then(response => {
            })
        }
    }
})
