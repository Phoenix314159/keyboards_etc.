angular.module('ecom').component('shoppingCart', {
    templateUrl: './views/shopping-cart.html',
    require: {
        main: '^mainComp'
    },

    controller: function (mainService, modelFactory) {
        let vm = this;
        vm.showCart = false;  //cart is not initially shown if empty
        vm.showBox2 = true;
        vm.show2 = false;
        vm.$onInit = () => {
            vm.show = vm.main.logged();
            if (vm.show) {
                vm.showBox = true;
                vm.show2 = true;
            } else {
                vm.showBox = false;
            }
        }
        vm.message1 = 'You have no items in your cart';
        vm.message2 = 'Please log in to add items to your cart';
        mainService.getCustomerInfo().then(response => {  //gets customer info to obtain id
            vm.customer = response.data;

            mainService.getCart(vm.customer.id).then(response => { //gets specific cart pertaining to id
                if (response.data.length > 0) {
                    vm.showCart = true;  //show cart if not empty
                    vm.show2 = false;
                    vm.products = response.data.map(v => { //add total property on each object in products array
                        v.total = v.price * v.quantity     // to get correct quantity
                        return v;
                    });
                    vm.cartTotal = 0;
                    vm.quantityTotal = 0;
                    for (let i = 0; i < vm.products.length; i++) {
                        vm.cartTotal += vm.products[i].total; //iterate over products array, to get sum of totals
                        vm.quantityTotal += vm.products[i].quantity; // to get sum of quantities
                    }
                    vm.qTotal = vm.quantityTotal * 1.99; //bind to view quantity total for shipping
                    vm.gTotal = vm.cartTotal + vm.qTotal; //bind to view total for grand total to pay
                }
            })
            //same as above however updates subtotal, shipping, and grand total when the update button is clicked
            vm.updateTotal = (cartid, quantity) => {
                mainService.updateQuantity(cartid, quantity).then(response => {

                    mainService.getCart(vm.customer.id).then(response => {

                        vm.cart = response.data;
                        vm.cart1 = vm.cart[0].cartid;
                        if (vm.cart.length > 0) {
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
                            vm.pId = false;
                            if (vm.quantityTotal === 0) {
                                vm.pId = true;
                                if(vm.cart.length === 0){
                                    vm.showCart = false;
                                    vm.show2 === true;
                                }
                            }
                        }
                    })
                })
            }
            vm.displayTotal = () => {
                modelFactory.displayTotal(vm.gTotal);
            }
            vm.deleteFromCart = (cartid) => {
                mainService.deleteFromCart(cartid).then(response => {  //deletes one item from cart
                    mainService.getCart(vm.customer.id).then(response => { //goes back to server to get cart again pertaining to customer id
                        if (response.data.length > 0) {
                            vm.showCart = true;  //if cart isn't empty, show it and display the products in it
                            vm.products = response.data;
                        } else if (response.data.length === 0) {
                            vm.showCart = false
                            vm.show2 = true;
                        }
                        else {
                            vm.showCart = false
                        }
                    })
                })
            }
        });
    }
});
