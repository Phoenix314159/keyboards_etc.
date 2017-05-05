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
    });
    $urlRouterProvider.otherwise('/');
}]);
'use strict';

angular.module('ecom').component('home', {
    templateUrl: '../views/home.html',
    controller: function controller() {}
});
'use strict';

angular.module('ecom').component('login', {
    templateUrl: '../views/login.html',
    controller: ["mainService", function controller(mainService) {}]
});
'use strict';

angular.module('ecom').component('signUp', {
    templateUrl: '../views/signUp.html',
    controller: ["mainService", function controller(mainService) {}]
});
'use strict';

angular.module('ecom').service('mainService', ["$http", function ($http) {
    var serverUrl = 'http://localhost:3060';
    this.getProducts = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products'
        });
    };
    this.login = function () {
        return $http({
            method: 'POST',
            url: serverUrl + '/api/login'
        });
    };
    this.signUp = function () {
        return $http({
            method: 'POST',
            url: serverUrl + '/api/newuser'
        });
    };
}]);
//# sourceMappingURL=bundle.js.map
