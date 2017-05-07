angular.module('ecom').component('productDetails', {
    templateUrl: './views/product-details.html',

    controller: function (mainService) {
        let vm = this;
        mainService.getProductById().then(response => {
            vm.product = response.data;
            console.log(response.data)
        })

    }
})
