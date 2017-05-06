angular.module('ecom').component('products', {
    templateUrl: './views/products.html',

    controller: function (mainService) {
        let vm = this;
        vm.getProducts = () => {
            mainService.getProducts().then(response => {
                vm.products = response.data;
                console.log(vm.products);
            })
        }
        vm.getProducts();
        mainService.getCustomerInfo().then(response => {
            console.log(response.data)
            vm.customer = response.data;
        })

        vm.addToCart = (productId) => {

            mainService.addToCart(vm.customer.id, productId, 1).then(response => {
            })
        }
        // vm.$onInit = () => {
        //     vm.dude = vm.parent.hiya();
        //     vm.products = vm.parent.getProducts();
        //    console.log(vm.parent.products);
        //    vm.addToCart = (productId) => {
        //        vm.parent.addToCart(productId);
        //    }
        // };


    }
})
