angular.module('ecom').controller('mainCtrl', function ($scope, mainService) {
     $scope.text = 'Login';
     $scope.change = () => {
         $scope.text = 'Welcome';
     }
})
