angular.module('ecom').component('home', {
    templateUrl: './views/home.html',

    controller: function (mainService) {
        let vm = this;
        vm.product3 = [];

        vm.subscribe = () => { //user subscribes to newsletter
            alert(`Thank you for subscribing ${vm.name}`)
        }
        let getCustomerInfo = async () => { //gets customer info to obtain customer id
            let response = await mainService.getCustomerInfo();
            vm.customer = await response.data;
        }
        getCustomerInfo();

        let getThreeProducts = async () => {
            let response1 = await mainService.getProductById2(16),
                response2 = await mainService.getProductById2(5),
                response3 = await mainService.getProductById2(29);
            vm.product16 = await response1.data[0];
            vm.product3.push(await vm.product16);
            vm.product5 = await response2.data[0];
            vm.product3.push(await vm.product5);
            vm.product29 = await response3.data[0];
            vm.product3.push(await vm.product29);
        }

        getThreeProducts();

        vm.addToCart = async (productId) => {  //adds product to cart dependent on customer id
            await mainService.addToCart(vm.customer.id, productId, 1);
        }
    }
})
