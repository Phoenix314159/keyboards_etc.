angular.module('ecom').service('mainService', function ($http, $stateParams) {
    var serverUrl = 'http://localhost:3055';
    let vm = this;
    this.getCustomerInfo = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/me'
        })
    }

    this.getProducts = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products/' + $stateParams.type
        })
    };
    this.getProductById = id => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/products/' + id
        })
    }
    this.login = (username, password) => {

        return $http({
            method: 'POST',
            data: {username, password},
            url: serverUrl + '/api/login'
        })
    };
    this.signUp = (firstname, lastname, email, username, password) => {
        return $http({
            method: 'POST',
            data: {firstname, lastname, email, username, password},
            url: serverUrl + '/api/newuser'
        })
    };
    this.getCart = (id) => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/cart/' + id
        })
    }
    this.addToCart = (customerId, productId, quantity) => {
        return $http({
            method: 'POST',
            data: {customerId, productId, quantity},
            url: serverUrl + '/api/addtocart'
        })
    };
    this.deleteFromCart = id => {
        return $http({
            method: 'DELETE',
            url: serverUrl + '/api/delete/' + id
        })
    };
    this.updateQuantity = (id, quantity) => {
        return $http({
            method: 'PUT',
            data: {id, quantity},
            url: serverUrl + '/api/updatequantity'
        })
    }



})
