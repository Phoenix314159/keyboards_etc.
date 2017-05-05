angular.module('ecom').component('products', {
    templateUrl: './views/products.html',

    controller: function (mainService) {
        let vm = this;
        mainService.getProducts().then(response => {
            vm.products = response.data;
            console.log(response.data)
        })
        // mainService.getCart().then(response => {
        //     console.log(response.data);
        //     vm.customerid = response.data.customerid;
        //     vm.productid = response.data.productid;
        // })
        vm.addToCart = function (productId) {
            mainService.addToCart(1, productId, 1).then(response => {
                mainService.getCart().then(response => {
                    console.log(response.data);
                    vm.currentCart = response.data;
                })
            })
        }

    }
})
