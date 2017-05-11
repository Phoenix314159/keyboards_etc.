angular.module('ecom').service('mainService', function ($http, $stateParams) {
    let serverUrl = 'http://localhost:3065',
        vm = this;

    vm.getCustomerInfo = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/me'
        })
    }

    vm.getProducts = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products'
        })
    };
    vm.getProductsByType = (type) => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products/' + type
        })
    }
    vm.getProductById = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/product/' + $stateParams.id
        })
    }
    vm.getProductById2 = (id) => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/product/' + id
        })
    }

    vm.signUp = (firstname, lastname, email, username, password) => {
        return $http({
            method: 'POST',
            data: {firstname, lastname, email, username, password},
            url: serverUrl + '/api/newuser'
        })
    };

    vm.getCart = (id) => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/cart/' + id
        })
    }

    vm.addToCart = (customerId, productId, quantity) => {
        return $http({
            method: 'POST',
            data: {customerId, productId, quantity},
            url: serverUrl + '/api/addtocart'
        })
    };

    vm.deleteFromCart = id => {
        return $http({
            method: 'DELETE',
            url: serverUrl + '/api/delete/' + id
        })
    };

    vm.deleteAllFromCart = () => {
        return $http({
            method: 'DELETE',
            url: serverUrl + '/api/deleteall'
        })
    }

    vm.updateQuantity = (id, quantity) => {
        return $http({
            method: 'PUT',
            data: {id, quantity},
            url: serverUrl + '/api/updatequantity'
        })
    };
    vm.login = (username, password) => {
        return $http({
            method: 'POST',
            data: {username, password},
            url: serverUrl + '/api/login'
        })
    };
    vm.logout = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/logout'
        })
    }
    vm.checkLogin = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/checklogin'
        })
    };
    vm.updateTotal = (productId) => {
        return $http({
            method: 'PUT',
            data: {productId},
            url: serverUrl + '/api/total'
        })
    }
    vm.getTotal = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/total'
        })
    }
})
