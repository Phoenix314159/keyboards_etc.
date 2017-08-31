
angular.module('ecom', ['ui.router', 'angular-stripe', 'angular-parallax'])
    .config(function ($urlRouterProvider, $stateProvider, stripeProvider) {
        stripeProvider.setPublishableKey('pk_test_YCIPURTU6ePqrjERaHH1AHMN');
        $stateProvider
            .state('home', {
                url: '/',
                template: '<home></home>',
                component: 'home'
            })
            .state('login', {
                url: '/login',
                template: '<login></login>',
                component: 'login'
            })
            .state('signup', {
                url: '/signup',
                template: '<sign-up></sign-up>',
                component: 'signUp'
            })
            .state('products', {
                url: '/products/:type',
                template: '<products></products>',
                component: 'products'
            })
            .state('shoppingCart', {
                url: '/shopping-cart',
                template: '<shopping-cart></shopping-cart>',
                component: 'shoppingCart'
            })
            .state('productDetails', {
                url: '/productsdetails/:id',
                template: '<product-details></product-details>',
                component: 'productDetails'
            })
            .state('user', {
                url: '/products',
                templateUrl: './views/user.html'
            })
            .state('payment', {
                url: '/payment',
                template: '<payment></payment>',
                component: 'payment'
            })
        $urlRouterProvider.otherwise('/');
    })

