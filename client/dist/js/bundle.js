'use strict';

angular.module('ecom', ['ui.router', 'angular-stripe', 'angular-parallax']).config(["$urlRouterProvider", "$stateProvider", "stripeProvider", function ($urlRouterProvider, $stateProvider, stripeProvider) {
    stripeProvider.setPublishableKey('pk_test_YCIPURTU6ePqrjERaHH1AHMN');
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
        url: '/productsdetails/:id',
        template: '<product-details></product-details>',
        component: 'productDetails'
    }).state('user', {
        url: '/products',
        templateUrl: './views/user.html'
    }).state('payment', {
        url: '/payment',
        template: '<payment></payment>',
        component: 'payment'
    });
    $urlRouterProvider.otherwise('/');
}]);
'use strict';

angular.module('ecom').component('home', {
    templateUrl: './views/home.html',

    controller: ["mainService", function controller(mainService) {
        var vm = this;
        vm.product3 = [];

        vm.subscribe = function () {
            //user subscribes to newsletter
            alert('Thank you for subscribing ' + vm.name);
        };
        mainService.getCustomerInfo().then(function (response) {
            vm.customer = response.data; //gets customer info to obtain customer id
        });
        mainService.getProductById2(16).then(function (response1) {
            //get an array of the 3 specific products on the home page to display
            mainService.getProductById2(5).then(function (response2) {
                mainService.getProductById2(29).then(function (response3) {

                    vm.product16 = response1.data[0];
                    vm.product3.push(vm.product16);
                    vm.product5 = response2.data[0];
                    vm.product3.push(vm.product5);
                    vm.product29 = response3.data[0];
                    vm.product3.push(vm.product29);
                });
            });
        });

        vm.addToCart = function (productId) {
            //adds product to cart dependent on customer id
            mainService.addToCart(vm.customer.id, productId, 1).then(function (response) {});
        };
    }]
});
'use strict';

angular.module('ecom').component('login', {
    templateUrl: './views/login.html',
    require: {
        main: '^mainComp'
    },
    controller: ["mainService", "$timeout", "$state", function controller(mainService, $timeout, $state) {
        var vm = this;

        vm.login = function () {
            mainService.login(vm.username, vm.password).then(function (response) {
                //login user
                mainService.deleteAllFromCart().then(function (response) {//delete all products from previous cart
                });
                mainService.getCustomerInfo().then(function (response) {
                    //get customers first name
                    vm.name = response.data.firstname;
                    vm.check();
                });
            });
        };
        vm.$onInit = function () {
            vm.check = function () {
                vm.main.checkLogin();
            };
        };
        vm.show = true; //show cart initially
        vm.goHome = function () {
            vm.show = false; //show redirect countdown
            vm.number = 3;
            $timeout(function () {
                vm.number = 2;
                $timeout(function () {
                    vm.number = 1;
                    $timeout(function () {}, 1000);
                }, 2000);
                $state.go('home'); //go to home state
            }, 3000);
        };
    }]
});
'use strict';

angular.module('ecom').component('mainComp', {
    templateUrl: './views/mainComp.html',
    controllerAs: 'main',
    controller: ["$http", "mainService", "$state", function controller($http, mainService, $state) {
        var vm = this;
        vm.checkLogin = function () {
            mainService.checkLogin().then(function (response) {
                if (response.data.user) {
                    vm.user = true;
                }
            });
        };
        vm.checkLogin();
        vm.logged = function () {
            if (vm.user) {
                return true;
            }
        };
        vm.logout = function () {
            mainService.logout().then(function (response) {
                vm.data = response.data;
                vm.user = false;
                $state.go('home');
            });
        };
    }]
});
'use strict';

angular.module('ecom').component('payment', {
    require: {
        parent: '^mainComp'
    },
    templateUrl: './views/payment.html',

    controller: ["stripe", "$http", "mainService", "modelFactory", "$state", "$timeout", function controller(stripe, $http, mainService, modelFactory, $state, $timeout) {
        var vm = this;
        vm.payment = {};
        vm.amount = modelFactory.getTotal();
        vm.showP = true;
        vm.show = function () {
            vm.showP = false;
        };
        vm.charge = function () {
            mainService.deleteAllFromCart().then(function (response) {//delete all products from previous cart
            });

            return stripe.card.createToken(vm.payment.card).then(function (response) {
                console.log('token created for card ending in ', response.card.last4);
                var payment = angular.copy(vm.payment);
                payment.card = void 0;
                payment.token = response.id;
                payment.amount = Number(vm.amount * 100);
                return $http.post('http://localhost:3085/api/payments', payment); //post payment to server
            }).then(function (payment) {
                console.log('successfully submitted payment for $', payment.amount);
            }).catch(function (err) {
                if (err.type && /^Stripe/.test(err.type)) {
                    console.log('Stripe error: ', err.message);
                } else {
                    console.log('Other error occurred, possibly with your API', err.message);
                }
            });
        };

        vm.goHome = function () {
            $timeout(function () {
                $timeout(function () {
                    $timeout(function () {
                        $timeout(function () {
                            $timeout(function () {
                                $timeout(function () {
                                    $timeout(function () {
                                        $timeout(function () {
                                            $timeout(function () {
                                                $timeout(function () {
                                                    $state.go('home');
                                                }, 1000);
                                            }, 1000);
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        };
    }]
});
'use strict';

angular.module('ecom').component('productDetails', {
    templateUrl: './views/product-details.html',

    controller: ["mainService", "$stateParams", function controller(mainService, $stateParams) {
        var vm = this;
        vm.getProducts = function () {
            mainService.getProducts().then(function (response) {
                //gets list of products to display
                vm.products = response.data;
                vm.product1 = $stateParams.id;
            });
        };
        vm.getProducts();

        mainService.getProductById().then(function (response) {
            vm.product = response.data[0];
        });

        mainService.getCustomerInfo().then(function (response) {
            vm.customer = response.data; //gets customer info to obtain customer id
        });

        vm.addToCart = function (productId) {
            //adds product to cart dependent on customer id

            mainService.addToCart(vm.customer.id, productId, 1).then(function (response) {});
        };
    }]
});
'use strict';

angular.module('ecom').component('products', {
    templateUrl: './views/products.html',

    controller: ["mainService", "$stateParams", function controller(mainService, $stateParams) {
        var vm = this;

        mainService.getCustomerInfo().then(function (response) {
            vm.customer = response.data; //gets customer info to obtain customer id
        });

        vm.getProductsByType = function () {
            mainService.getProductsByType($stateParams.type).then(function (response) {
                vm.products = response.data;
            });
        };
        vm.getProductsByType();

        vm.addToCart = function (productId) {
            //adds product to cart dependent on customer id
            mainService.addToCart(vm.customer.id, productId, 1).then(function (response) {});
        };
    }]
});
'use strict';

angular.module('ecom').component('shoppingCart', {
    templateUrl: './views/shopping-cart.html',
    require: {
        main: '^mainComp'
    },

    controller: ["mainService", "modelFactory", function controller(mainService, modelFactory) {
        var vm = this;
        vm.showCart = false; //cart is not initially shown if empty
        vm.showBox2 = true;
        vm.show2 = false;
        vm.$onInit = function () {
            vm.show = vm.main.logged();
            if (vm.show) {
                vm.showBox = true;
                vm.show2 = true;
            } else {
                vm.showBox = false;
            }
        };

        vm.message1 = 'You have no items in your cart';
        vm.message2 = 'Please log in to add items to your cart';
        mainService.getCustomerInfo().then(function (response) {
            //gets customer info to obtain id
            vm.customer = response.data;

            mainService.getCart(vm.customer.id).then(function (response) {
                //gets specific cart pertaining to id
                if (response.data.length > 0) {
                    vm.showCart = true; //show cart if not empty
                    vm.show2 = false;
                    vm.products = response.data.map(function (v) {
                        //add total property on each object in products array
                        v.total = v.price * v.quantity; // to get correct quantity
                        return v;
                    });
                    vm.cartTotal = 0;
                    vm.quantityTotal = 0;
                    for (var i = 0; i < vm.products.length; i++) {
                        vm.cartTotal += vm.products[i].total; //iterate over products array, to get sum of totals
                        vm.quantityTotal += vm.products[i].quantity; // to get sum of quantities
                    }
                    vm.qTotal = vm.quantityTotal * 1.99; //bind to view quantity total for shipping
                    vm.gTotal = vm.cartTotal + vm.qTotal; //bind to view total for grand total to pay
                }
            });
            //same as above however updates subtotal, shipping, and grand total when the update button is clicked
            vm.updateTotal = function (cartid, quantity) {
                mainService.updateQuantity(cartid, quantity).then(function (response) {

                    mainService.getCart(vm.customer.id).then(function (response) {

                        vm.cart = response.data;
                        vm.cart1 = vm.cart[0].cartid;
                        console.log(vm.cart[0]);
                        if (vm.cart.length > 0) {
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
                            vm.pId = false;
                            if (vm.quantityTotal === 0) {
                                vm.pId = true;
                                if (vm.cart.length === 0) {
                                    vm.showCart = false;
                                    vm.show2 === true;
                                }
                            }
                        }
                    });
                });
            };
            vm.displayTotal = function () {
                modelFactory.displayTotal(vm.gTotal);
            };
            vm.deleteFromCart = function (cartid) {
                console.log('working');
                mainService.deleteFromCart(cartid).then(function (response) {
                    //deletes one item from cart
                    mainService.getCart(vm.customer.id).then(function (response) {
                        //goes back to server to get cart again pertaining to customer id
                        if (response.data.length > 0) {
                            vm.showCart = true; //if cart isn't empty, show it and display the products in it
                            vm.products = response.data;
                        } else if (response.data.length === 0) {
                            vm.showCart = false;
                            vm.show2 = true;
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
    controller: ["mainService", "$timeout", "$state", function controller(mainService, $timeout, $state) {
        var vm = this;
        vm.addNewUser = function () {
            //post request to add new user to users table
            mainService.signUp(vm.firstname, vm.lastname, vm.email, vm.username, vm.password).then(function (response) {});
        };
        vm.show = true; //form is initially visible
        vm.goHome = function () {
            vm.show = false; //when sign up button is clicked, form disappears
            vm.number = 3;
            $timeout(function () {
                //redirect counts down
                vm.number = 2;
                $timeout(function () {
                    vm.number = 1;
                    $timeout(function () {}, 1000);
                }, 2000);
                $state.go('home'); //goes to home state in 3 seconds
            }, 3000);
        };
    }]
});
'use strict';

angular.module('ecom').component('timeOut', {
    templateUrl: './views/user.html',
    controller: ["$timeout", "$state", function controller($timeout, $state) {
        var vm = this;
        vm.count = 3;
        $timeout(function () {
            $timeout(function () {
                $timeout(function () {
                    vm.count = 1;
                }, 1000);
                vm.count = 2;
            }, 2000);
            $state.go('home');
        }, 3000);
    }]
});
'use strict';

angular.module('angular-parallax', []).directive('parallax', ['$window', function ($window) {
  return {
    restrict: 'A',
    scope: {
      parallaxRatio: '@',
      parallaxVerticalOffset: '@',
      parallaxHorizontalOffset: '@'
    },
    link: function link($scope, elem, attrs) {
      var setPosition = function setPosition() {
        if (!$scope.parallaxHorizontalOffset) $scope.parallaxHorizontalOffset = '0';
        var calcValY = $window.pageYOffset * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1);
        if (calcValY <= $window.innerHeight) {
          var topVal = calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY;
          var hozVal = $scope.parallaxHorizontalOffset.indexOf("%") === -1 ? $scope.parallaxHorizontalOffset + 'px' : $scope.parallaxHorizontalOffset;
          elem.css('transform', 'translate(' + hozVal + ', ' + topVal + 'px)');
        }
      };

      setPosition();

      angular.element($window).bind("scroll", setPosition);
      angular.element($window).bind("touchmove", setPosition);
    } // link function
  };
}]).directive('parallaxBackground', ['$window', function ($window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    scope: {
      parallaxRatio: '@',
      parallaxVerticalOffset: '@'
    },
    link: function link($scope, elem, attrs) {
      var setPosition = function setPosition() {
        var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1) - ($scope.parallaxVerticalOffset || 0);
        // horizontal positioning
        elem.css('background-position', "50% " + calcValY + "px");
      };

      // set our initial position - fixes webkit background render bug
      angular.element($window).bind('load', function (e) {
        setPosition();
        $scope.$apply();
      });

      angular.element($window).bind("scroll", setPosition);
      angular.element($window).bind("touchmove", setPosition);
    } // link function
  };
}]);
'use strict';

angular.module('ecom').directive('backGround', ["$timeout", "$interval", function ($timeout, $interval) {
    return {
        restrict: 'A',
        link: function link(scope, elem, attr) {
            var base = './js2/images/image1.jpeg',
                backgrounds = ['./js2/images/image2.jpg', './js2/images/image3.jpg', './js2/images/image4.jpg', './js2/images/image5.JPG', './js2/images/image6.jpg', './js2/images/image7.jpg', './js2/images/image8.jpg', './js2/images/image9.jpg', './js2/images/image10.jpg', base];
            var preLoad = function preLoad() {
                backgrounds.forEach(function (img) {
                    new Image().src = img;
                });
            };
            preLoad();
            var i = -1;

            $interval(function () {
                i++;
                if (i === backgrounds.length) {
                    i = 0;
                }
                var bg_string = "url(" + backgrounds[i] + ")";

                elem.css({
                    'background-image': bg_string,
                    'z-index': '-1'
                });
            }, 7500);
        }
    };
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

angular.module('ecom').directive('countDown', ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        template: '<div>{{number}}</div>',
        link: function link(scope, element, attrs) {
            scope.number = 3;
            $timeout(function () {
                scope.number = 2;
                $timeout(function () {
                    scope.number = 1;
                    $timeout(function () {}, 1000);
                }, 1000);
            }, 1000);
        }
    };
}]);
'use strict';

angular.module('ecom').directive('countDown2', ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        template: '<div>{{number}}</div>',
        link: function link(scope, element, attrs) {
            scope.number = 10;
            $timeout(function () {
                scope.number = 9;
                $timeout(function () {
                    scope.number = 8;
                    $timeout(function () {
                        scope.number = 7;
                        $timeout(function () {
                            scope.number = 6;
                            $timeout(function () {
                                scope.number = 5;
                                $timeout(function () {
                                    scope.number = 4;
                                    $timeout(function () {
                                        scope.number = 3;
                                        $timeout(function () {
                                            scope.number = 2;
                                            $timeout(function () {
                                                scope.number = 1;
                                            }, 1000);
                                        }, 1000);
                                    }, 1000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }
    };
}]);
'use strict';

angular.module('ecom').directive('fade', function () {
    return {
        restrict: 'A',
        link: function link(scope, elem, attr) {
            elem.mouseleave(function () {
                elem.css({
                    'transition': '.750s',
                    'box-shadow': '0 0 0 0 rgba(0,0,0,0)',
                    'opacity': '0'
                });
            });
            elem.mouseenter(function () {
                elem.css({
                    'transition': '.750s',
                    'box-shadow': '0 2px 5px 0 rgba(0,0,0,.16)',
                    'opacity': '1'
                });
            });
        }
    };
});
'use strict';

angular.module('ecom').directive('navBar', function () {
      return {
            restrict: 'E',
            template: '<div id="navbarNav1">\n                        <ul class="navbar-nav mr-auto waves-effect waves-light" style="width:auto">\n                              <li class="nav-item">\n                                    <a class="nav-link" ui-sref="home">Home</a>\n                              </li>\n                              <li class="nav-item">\n                                    <a class="nav-link" ui-sref="products({type:\'allproducts\'})">&nbsp;All\n                                                                                                 Products</a>\n                              </li>\n                              <li class="nav-item">\n                                    <a class="nav-link" ui-sref="shoppingCart">&nbsp;Shopping Cart</a>\n                              </li>\n                        </ul>\n                        <form class="form-inline waves-effect waves-light">\n                              <a class="animated fadeIn nav-link" ui-sref="login" ng-hide="main.user">Login</a>\n                              <a class="animated fadeIn nav-link" ui-sref="signup" ng-hide="main.user">Sign-Up</a>\n                              <a class="animated fadeIn nav-link" ng-click="main.logout()" ng-show="main.user">Logout</a>\n                        </form>\n                  </div>'
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
    var serverUrl = 'http://localhost:3085',
        vm = this;

    vm.getCustomerInfo = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/me'
        });
    };

    vm.getProducts = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products'
        });
    };
    vm.getProductsByType = function (type) {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products/' + type
        });
    };
    vm.getProductById = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/product/' + $stateParams.id
        });
    };
    vm.getProductById2 = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/product/' + id
        });
    };

    vm.signUp = function (firstname, lastname, email, username, password) {
        return $http({
            method: 'POST',
            data: { firstname: firstname, lastname: lastname, email: email, username: username, password: password },
            url: serverUrl + '/api/newuser'
        });
    };

    vm.getCart = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/cart/' + id
        });
    };

    vm.addToCart = function (customerId, productId, quantity) {
        return $http({
            method: 'POST',
            data: { customerId: customerId, productId: productId, quantity: quantity },
            url: serverUrl + '/api/addtocart'
        });
    };

    vm.deleteFromCart = function (id) {
        return $http({
            method: 'DELETE',
            url: serverUrl + '/api/delete/' + id
        });
    };

    vm.deleteAllFromCart = function () {
        return $http({
            method: 'DELETE',
            url: serverUrl + '/api/deleteall'
        });
    };

    vm.updateQuantity = function (id, quantity) {
        return $http({
            method: 'PUT',
            data: { id: id, quantity: quantity },
            url: serverUrl + '/api/updatequantity'
        });
    };
    vm.login = function (username, password) {
        return $http({
            method: 'POST',
            data: { username: username, password: password },
            url: serverUrl + '/api/login'
        });
    };
    vm.logout = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/logout'
        });
    };
    vm.checkLogin = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/checklogin'
        });
    };
}]);
'use strict';

angular.module('ecom').factory('modelFactory', function () {
    var total = [],
        displayTotal = function displayTotal(t) {
        total.push(t);
    },
        getTotal = function getTotal() {
        while (total.length > 1) {
            total.shift();
        }
        return total[0];
    };
    return {
        displayTotal: displayTotal,
        getTotal: getTotal
    };
});
//# sourceMappingURL=bundle.js.map
