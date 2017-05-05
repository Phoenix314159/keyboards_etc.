angular.module('ecom').controller('mainCtrl', function ($scope, mainService) {
   $scope.cart = [];
   // mainService.getCart().then(response => {
   //     $scope.cart = response.data;
   // })
});