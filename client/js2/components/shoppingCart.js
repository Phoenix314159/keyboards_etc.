angular.module('ecom').component('shoppingCart', {
    templateUrl: './views/shopping-cart.html',
    require: {
      parent: '^mainComp'
    },
    controller: function (mainService) {
        let vm = this;
        vm.showCart = false;
        vm.getCart = () => {
            mainService.getCart().then(response => {
                if (response.data.length > 0) {
                    vm.showCart = true;
                    vm.products = response.data.map((v, i, a) => {
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
        };
        vm.getCart();
        vm.updateTotal = (id, quantity) => {
            mainService.updateQuantity(id, quantity).then(response => {
                vm.getCart();
            })
        }
        vm.deleteFromCart = (id) => {
            mainService.deleteFromCart(id).then(response => {
                mainService.getCart().then(response => {
                    if (response.data.length > 0) {
                        vm.showCart = true;
                        vm.products = response.data;
                    } else {
                        vm.showCart = false;
                    }
                })
            })
        }
    }
});
