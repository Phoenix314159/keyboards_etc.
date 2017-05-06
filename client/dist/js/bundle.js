'use strict';

angular.module('ecom', ['ui.router']).config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        template: '<home></home>',
        component: 'home'
    }).state('login', {
        url: '/login',
        template: '<login></login>',
        component: 'login'
    }).state('signup', {
        url: '/signup',
        template: '<sign-up></sign-up>',
        component: 'signUp'
    }).state('products', {
        url: '/products/:type',
        template: '<products></products>',
        component: 'products'
    }).state('shoppingCart', {
        url: '/shopping-cart',
        template: '<shopping-cart></shopping-cart>',
        component: 'shoppingCart'
    }).state('productDetails', {
        url: '/productdetails',
        template: '<product-details></product-details>',
        component: 'productDetails'
    }).state('user', {
        url: '/products',
        templateUrl: './views/user.html'
    });
    $urlRouterProvider.otherwise('/');
}]);
'use strict';

angular.module('ecom').component('home', {
    templateUrl: './views/home.html',
    controller: function controller() {
        var vm = this;
        vm.subscribe = function () {
            alert('Thank you for subscribing ' + vm.name);
        };
    }
});
'use strict';

angular.module('ecom').component('login', {
    templateUrl: './views/login.html',
    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.login = function () {
            mainService.login(vm.username, vm.password).then(function (response) {});
        };
    }]
});
'use strict';

angular.module('ecom').component('mainComp', {

    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.hiya = function () {
            return 'Hiya from parent!';
        };
    }]
});
'use strict';

angular.module('ecom').component('productDetails', {
    templateUrl: './views/product-details.html'
});
'use strict';

angular.module('ecom').component('products', {
    templateUrl: './views/products.html',
    // require: {
    //     parent: '^mainComp'
    // },

    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.getProducts = function () {
            mainService.getProducts().then(function (response) {
                vm.products = response.data;
                console.log(vm.products);
            });
        };
        vm.getProducts();

        vm.addToCart = function (productId) {
            mainService.addToCart(1, productId, 1).then(function (response) {});
        };
        // vm.$onInit = () => {
        //     vm.dude = vm.parent.hiya();
        //     vm.products = vm.parent.getProducts();
        //    console.log(vm.parent.products);
        //    vm.addToCart = (productId) => {
        //        vm.parent.addToCart(productId);
        //    }
        // };

    }]
});
'use strict';

angular.module('ecom').component('shoppingCart', {
    templateUrl: './views/shopping-cart.html',
    // require: {
    //   parent: '^mainComp'
    // },
    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.showCart = false;

        mainService.getCart().then(function (response) {
            if (response.data.length > 0) {
                vm.showCart = true;
                vm.products = response.data.map(function (v, i, a) {
                    v.total = v.price * v.quantity;
                    return v;
                });
                vm.cartTotal = 0;
                vm.quantityTotal = 0;
                for (var i = 0; i < vm.products.length; i++) {
                    vm.cartTotal += vm.products[i].total;
                    vm.quantityTotal += vm.products[i].quantity;
                }
                vm.qTotal = vm.quantityTotal * 1.99;
                vm.gTotal = vm.cartTotal + vm.qTotal;
            }
        });

        vm.updateTotal = function (id, quantity) {
            mainService.updateQuantity(id, quantity).then(function (response) {
                mainService.getCart().then(function (response) {
                    if (response.data.length > 0) {
                        vm.showCart = true;
                        vm.products = response.data.map(function (v, i, a) {
                            v.total = v.price * v.quantity;
                            return v;
                        });
                        vm.cartTotal = 0;
                        vm.quantityTotal = 0;
                        for (var i = 0; i < vm.products.length; i++) {
                            vm.cartTotal += vm.products[i].total;
                            vm.quantityTotal += vm.products[i].quantity;
                        }
                        vm.qTotal = vm.quantityTotal * 1.99;
                        vm.gTotal = vm.cartTotal + vm.qTotal;
                    }
                });
            });
        };
        vm.deleteFromCart = function (id) {
            mainService.deleteFromCart(id).then(function (response) {
                mainService.getCart().then(function (response) {
                    if (response.data.length > 0) {
                        vm.showCart = true;
                        vm.products = response.data;
                    } else {
                        vm.showCart = false;
                    }
                });
            });
        };
    }]
});
'use strict';

angular.module('ecom').component('signUp', {
    templateUrl: './views/signUp.html',
    bindings: {
        view: '<'
    },
    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.addNewUser = function () {
            mainService.signUp(vm.firstname, vm.lastname, vm.email, vm.username, vm.password).then(function (response) {});
        };
    }]
});
'use strict';

angular.module('ecom').directive('buttonD', function () {
    return {
        restrict: 'A',
        link: function link(scope, elem, attr) {
            elem.on('click', function () {
                elem.html("ADDED TO CART");
            });
        }
    };
});
'use strict';

angular.module('ecom').directive('shipping', function () {
    return {
        restrict: 'E',
        template: '<div>Shipping is <br/> $1.99 per item</div>'
    };
});
'use strict';

angular.module('ecom').service('mainService', ["$http", "$stateParams", function ($http, $stateParams) {
    var serverUrl = 'http://localhost:3055';

    this.getProducts = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products/' + $stateParams.type
        });
    };
    this.getProductById = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products/' + id
        });
    };
    this.login = function (username, password) {
        return $http({
            method: 'POST',
            data: { username: username, password: password },
            url: serverUrl + '/api/login'
        });
    };
    this.signUp = function (firstname, lastname, email, username, password) {
        return $http({
            method: 'POST',
            data: { firstname: firstname, lastname: lastname, email: email, username: username, password: password },
            url: serverUrl + '/api/newuser'
        });
    };
    this.getCart = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/cart'
        });
    };
    this.addToCart = function (customerId, productId, quantity) {
        return $http({
            method: 'POST',
            data: { customerId: customerId, productId: productId, quantity: quantity },
            url: serverUrl + '/api/addtocart'
        });
    };
    this.deleteFromCart = function (id) {
        return $http({
            method: 'DELETE',
            url: serverUrl + '/api/delete/' + id
        });
    };
    this.updateQuantity = function (id, quantity) {
        return $http({
            method: 'PUT',
            data: { id: id, quantity: quantity },
            url: serverUrl + '/api/updatequantity'
        });
    };
}]);
//# sourceMappingURL=bundle.js.map
