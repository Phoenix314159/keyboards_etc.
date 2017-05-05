angular.module('ecom').component('products', {
    templateUrl: './views/products.html',
    require: {
        parent: '^mainComp'
    },

    controller: function () {
        let vm = this;
        vm.$onInit = () => {
            vm.dude = vm.parent.hiya();
            vm.products = vm.parent.getProducts();
           console.log(vm.parent.products);
           vm.addToCart = (productId) => {
               vm.parent.addToCart(productId);
           }
        };


    }
})
