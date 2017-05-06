'use strict';

angular.module('ecom', ['ui.router']).config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('home', {
        url: '/',
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
    }).state('payment', {
        url: '/payment',
        templateUrl: '<payment></payment>',
        component: 'payment'
    });
    $urlRouterProvider.otherwise('/');
}]);
'use strict';

angular.module('ecom').component('home', {
    templateUrl: './views/home.html',
    bindings: {
        loggedIn: '='
    },
    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.subscribe = function () {
            alert('Thank you for subscribing ' + vm.name);
        };
        vm.addToCart = function (productId) {
            mainService.addToCart(1, productId, 1).then(function (response) {});
        };
    }]
});
'use strict';

angular.module('ecom').component('login', {
    templateUrl: './views/login.html',

    bindings: {
        loggedIn: '<'

    },
    require: {
        parent: '^mainComp'
    },
    controller: ["mainService", "$scope", function controller(mainService, $scope) {
        var vm = this;
        vm.$onInit = function () {
            vm.login = function () {
                mainService.login(vm.username, vm.password).then(function (response) {
                    vm.parent.loggedIn = true;
                    console.log(vm.parent);
                });
            };
        };
    }]
});
'use strict';

angular.module('ecom').component('mainComp', {
	template: '<header>\n\t\t\t\t<nav class="navbar navbar-toggleable-md navbar-dark">\n\t\t\t\t\t<div class="container">\n\t\t\t\t\t\t<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"\n\t\t\t\t\t\t        data-target="#navbarNav1" aria-controls="navbarNav1" aria-expanded="false"\n\t\t\t\t\t\t        aria-label="Toggle navigation">\n\t\t\t\t\t\t\t<span class="navbar-toggler-icon"></span>\n\t\t\t\t\t\t</button>\n\n\t\t\t\t    <div class="collapse navbar-collapse" id="navbarNav1">\n\t\t\t\t\t\t\t<ul class="navbar-nav mr-auto">\n\t\t\t\t\t\t\t\t<li class="nav-item">\n\t\t\t\t\t\t\t\t\t<a class="nav-link" ui-sref="products({type:\'allproducts\'})">All\n\t\t\t\t\t\t\t\t\t\tProducts</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li class="nav-item">\n\t\t\t\t\t\t\t\t\t<a class="nav-link" ui-sref="shoppingCart">Shopping Cart</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t<form class="form-inline waves-effect waves-light">\n\t\t\t\t\t\t\t\t<a class="nav-link" ui-sref="login">{{$ctrl.text}}</a>\n\t\t\t\t\t\t\t\t<a class="nav-link" ui-sref="signup">Sign-Up</a>\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</nav>\n\t\t\t\t</header>\n       <ui-view></ui-view>',

	controller: function controller() {
		var vm = this;
		vm.text = 'Login';
		vm.$onInit = function () {
			if (vm.loggedIn) {
				vm.text = 'Welcome';
				console.log(vm.loggedIn);
			}
		};
	}
});
'use strict';

angular.module('ecom').component('payment', {

    templateUrl: './views/payment.html',

    controller: function controller() {}
});
'use strict';

angular.module('ecom').component('productDetails', {
    templateUrl: './views/product-details.html'
});
'use strict';

angular.module('ecom').component('products', {
    templateUrl: './views/products.html',

    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.getProducts = function () {
            mainService.getProducts().then(function (response) {
                vm.products = response.data;
                console.log(vm.products);
            });
        };
        vm.getProducts();
        mainService.getCustomerInfo().then(function (response) {
            console.log(response.data);
            vm.customer = response.data;
        });

        vm.addToCart = function (productId) {

            mainService.addToCart(vm.customer.id, productId, 1).then(function (response) {});
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

    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.showCart = false;
        mainService.getCustomerInfo().then(function (response) {
            vm.customer = response.data;
            mainService.getCart(vm.customer.id).then(function (response) {
                if (response.data.length > 0) {
                    vm.showCart = true;
                    vm.products = response.data.map(function (v) {
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

            vm.updateTotal = function (cartid, quantity) {
                mainService.updateQuantity(cartid, quantity).then(function (response) {
                    mainService.getCart(vm.customer.id).then(function (response) {
                        if (response.data.length > 0) {
                            vm.showCart = true;
                            vm.products = response.data.map(function (v) {
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
            vm.deleteFromCart = function (cartid) {
                mainService.deleteFromCart(cartid).then(function (response) {
                    mainService.getCart(vm.customer.id).then(function (response) {
                        if (response.data.length > 0) {
                            vm.showCart = true;
                            vm.products = response.data;
                        } else {
                            vm.showCart = false;
                        }
                    });
                });
            };
        });
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

angular.module('ecom').controller('mainCtrl', ["$scope", "mainService", function ($scope, mainService) {
   $scope.text = 'Login';
   if ($scope.loggedIn) {
      $scope.text = 'Welcome';
   }
   console.log($scope.loggedIn);
}]);
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
    var vm = this;
    this.getCustomerInfo = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/me'
        });
    };

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
    this.getCart = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/cart/' + id
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
