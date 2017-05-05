angular.module('ecom', ['ui.router'])
    .config(function ($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
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
                url: '/productdetails',
                template: '<product-details></product-details>',
                component: 'productDetails'
            })
            .state('user', {
                url: '/products',
                templateUrl: './views/user.html'
            })
        $urlRouterProvider.otherwise('/');
    })

