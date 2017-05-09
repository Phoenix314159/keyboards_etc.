angular.module('ecom').component('home', {
    templateUrl: './views/home.html',

    controller: function (mainService) {
        let vm = this;
        vm.product3 = [];
        vm.product4 = [];
        vm.subscribe = () => { //user subscribes to newsletter
            alert(`Thank you for subscribing ${vm.name}`)
        }
        mainService.getCustomerInfo().then(response => {
            vm.customer = response.data;  //gets customer info to obtain customer id
        })
        mainService.getProductById2(16).then(response1 => { //get an array of the 3 specific products on the home page to display
            mainService.getProductById2(5).then(response2 => {
                mainService.getProductById2(29).then(response3 => {
                    mainService.getProductById2(2).then(response4 => {
                        mainService.getProductById2(26).then(response5 => {
                            mainService.getProductById2(23).then(response6 => {

                                vm.product16 = response1.data[0];
                                vm.product3.push(vm.product16);
                                vm.product5 = response2.data[0];
                                vm.product3.push(vm.product5);
                                vm.product29 = response3.data[0];
                                vm.product3.push(vm.product29);
                                vm.product2 = response4.data[0];
                                vm.product4.push(vm.product2);
                                vm.product26 = response5.data[0];
                                vm.product4.push(vm.product26);
                                vm.product23 = response6.data[0];
                                vm.product4.push(vm.product23);
                            })
                        })
                    })
                })
            })
        })

        vm.addToCart = (productId) => {  //adds product to cart dependent on customer id
            mainService.addToCart(vm.customer.id, productId, 1).then(response => {
            })
        }

    }
})
