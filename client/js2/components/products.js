angular.module('ecom').component('products', {
    templateUrl: './views/products.html',
    // require:{
    //     parent: '^mainComp'
    // },

    controller: function (mainService, $stateParams) {
        let vm = this;

        mainService.getProducts().then(response => { //gets list of products to display
            vm.products = response.data;
        })
        mainService.getCustomerInfo().then(response => {
            vm.customer = response.data;  //gets customer info to obtain customer id
        })

        //     // vm.getProductsByType = () => {
        //     //     mainService.getProductsByType(vm.id).then(response => {
        //     //         vm.products1 = response.data;
        //     //         console.log(vm.products1)
        //     //         console.log($stateParams)
        //     //     })
        //     // }
        //     // vm.getProductsByType();
        //
        //
        //     // vm.type = 'keyboards'
        //     // vm.getProductById = () => {   //get product by id to display on product details page
        //     //     mainService.getProducts().then(response => {
        //     //         vm.products = response.data;
        //     //         console.log(vm.productId)
        //     //     })
        //     // }
        //     // vm.getProductById();
        //
        //     // vm.parent.getCustomerId().then(response => {
        //     //     vm.customerId = response.data;
        //     //     console.log(response.data);
        //     // });
        //
        vm.addToCart = (productId) => {  //adds product to cart dependent on customer id
            mainService.addToCart(vm.customer.id, productId, 1).then(response => {
            })
        }
    }
})
