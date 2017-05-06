angular.module('ecom').component('shoppingCart', {
    templateUrl: './views/shopping-cart.html',

    controller: function (mainService) {
        let vm = this;
        vm.showCart = false;
        mainService.getCustomerInfo().then(response => {
            vm.customer = response.data;
            mainService.getCart(vm.customer.id).then(response => {
                if (response.data.length > 0) {
                    vm.showCart = true;
                    vm.products = response.data.map(v => {
                        v.total = v.price * v.quantity
                        return v;
                    });
                    vm.cartTotal = 0;
                    vm.quantityTotal = 0;
                    for (let i = 0; i < vm.products.length; i++) {
                        vm.cartTotal += vm.products[i].total;
                        vm.quantityTotal += vm.products[i].quantity;
                    }
                    vm.qTotal = vm.quantityTotal * 1.99;
                    vm.gTotal = vm.cartTotal + vm.qTotal;
                }

            })


            vm.updateTotal = (cartid, quantity) => {
                mainService.updateQuantity(cartid, quantity).then(response => {
                    mainService.getCart(vm.customer.id).then(response => {
                        if (response.data.length > 0) {
                            vm.showCart = true;
                            vm.products = response.data.map(v => {
                                v.total = v.price * v.quantity
                                return v;
                            });
                            vm.cartTotal = 0;
                            vm.quantityTotal = 0;
                            for (let i = 0; i < vm.products.length; i++) {
                                vm.cartTotal += vm.products[i].total;
                                vm.quantityTotal += vm.products[i].quantity;
                            }
                            vm.qTotal = vm.quantityTotal * 1.99;
                            vm.gTotal = vm.cartTotal + vm.qTotal;
                        }

                    })
                })
            }
            vm.deleteFromCart = (cartid) => {
                mainService.deleteFromCart(cartid).then(response => {
                    mainService.getCart(vm.customer.id).then(response => {
                        if (response.data.length > 0) {
                            vm.showCart = true;
                            vm.products = response.data;
                        } else {
                            vm.showCart = false;
                        }
                    })
                })
            }
        });
    }

});
