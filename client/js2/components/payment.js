angular.module('ecom').component('payment', {
    require: {
        parent: '^mainComp'
    },
    templateUrl: './views/payment.html',

    controller: function (stripe, $http, mainService, modelFactory, $state, $timeout) {
        let vm = this;
        vm.payment = {};
        vm.amount = modelFactory.getTotal();
        vm.showP = true;
        vm.show = () => {
            vm.showP = false;
        }
        vm.charge = () => {
            mainService.deleteAllFromCart().then(response => {  //delete all products from previous cart
            })

            return stripe.card.createToken(vm.payment.card).then(response => {
                console.log('token created for card ending in ', response.card.last4);
                let payment = angular.copy(vm.payment);
                payment.card = void 0;
                payment.token = response.id;
                payment.amount = Number(vm.amount);
                return $http.post('http://localhost:3085/api/payments', payment);  //post payment to server
            }).then(function (payment) {
                console.log('successfully submitted payment for $', payment.amount);
            })
                .catch(function (err) {
                    if (err.type && /^Stripe/.test(err.type)) {
                        console.log('Stripe error: ', err.message);
                    }
                    else {
                        console.log('Other error occurred, possibly with your API', err.message);
                    }
                });
        };

        vm.goHome = () => {
            $timeout(() => {
                $timeout(() => {
                    $timeout(() => {
                        $timeout(() => {
                            $timeout(() => {
                                $timeout(() => {
                                    $timeout(() => {
                                        $timeout(() => {
                                            $timeout(() => {
                                                $timeout(() => {
                                                    $state.go('home');
                                                }, 1000)
                                            }, 1000)
                                        }, 1000)
                                    }, 1000)
                                }, 1000)
                            }, 1000)
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)

        }
    }
})

