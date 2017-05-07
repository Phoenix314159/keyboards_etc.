angular.module('ecom').component('products', {
    templateUrl: './views/products.html',

    controller: function (mainService, $stateParams) {
        let vm = this;

        vm.getProducts = () => {
            mainService.getProducts().then(response => { //gets list of products to display
                vm.products = response.data;

            })
        }
        vm.getProducts();
        mainService.getCustomerInfo().then(response => {
            vm.customer = response.data;  //gets customer info to obtain customer id

        })


        mainService.getProductsByType().then(response => {
            vm.products = response.data;
            console.log(vm.products)
        })

        // vm.type = 'keyboards'
        // vm.getProductById = () => {   //get product by id to display on product details page
        //     mainService.getProducts().then(response => {
        //         vm.products = response.data;
        //         console.log(vm.productId)
        //     })
        // }
        // vm.getProductById();

        vm.addToCart = (productId) => {  //adds product to cart dependent on customer id

            mainService.addToCart(vm.customer.id, productId, 1).then(response => {
            })
        }
    }
})
