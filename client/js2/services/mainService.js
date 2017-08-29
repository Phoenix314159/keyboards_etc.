angular.module('ecom').service('mainService', function ($http, $stateParams) {

    let vm = this;

    vm.getCustomerInfo = () => {
        return $http({
            method: 'GET',
            url: '/api/me'
        })
    }

    vm.getProducts = () => {
        return $http({
            method: 'GET',
            url: '/api/products'
        });
    };
    vm.getProductsByType = type => {
        return $http({
            method: 'GET',
            url: '/api/products/' + type
        })
    }
    vm.getProductById = () => {
        return $http({
            method: 'GET',
            url: '/api/product/' + $stateParams.id
        })
    }
    vm.getProductById2 = id => {
        return $http({
            method: 'GET',
            url: '/api/product/' + id
        })
    }

    vm.signUp = (firstname, lastname, email, username, password) => {
        return $http({
            method: 'POST',
            data: {firstname, lastname, email, username, password},
            url: '/api/newuser'
        })
    };

    vm.getCart = id => {
        return $http({
            method: 'GET',
            url: '/api/cart/' + id
        })
    }

    vm.addToCart = (customerId, productId, quantity) => {
        return $http({
            method: 'POST',
            data: {customerId, productId, quantity},
            url: '/api/addtocart'
        })
    };

    vm.deleteFromCart = id => {
        return $http({
            method: 'DELETE',
            url: '/api/delete/' + id
        })
    };

    vm.deleteAllFromCart = () => {
        return $http({
            method: 'DELETE',
            url: '/api/deleteall'
        })
    }

    vm.updateQuantity = (id, quantity) => {
        return $http({
            method: 'PUT',
            data: {id, quantity},
            url: '/api/updatequantity'
        })
    };
    vm.login = (username, password) => {
        return $http({
            method: 'POST',
            data: {username, password},
            url: '/api/login'
        })
    };
    vm.logout = () => {
        return $http({
            method: 'GET',
            url: '/api/logout'
        })
    }
    vm.checkLogin = () => {
        return $http({
            method: 'GET',
            url: '/api/checklogin'
        })
    };
})
