angular.module('ecom').controller('mainCtrl', function ($scope, mainService) {
    $scope.text = 'Login';
    if($scope.loggedIn){
        $scope.text = 'Welcome';
    }
   // console.log($scope.loggedIn)
    // let vm = this;
    // vm.loggedIn = false;
    // vm.login = () => {
    //     mainService.login(vm.username, vm.password).then(response => {
    //         vm.loggedIn = true;
    //     })
    // }
    // vm.text = 'Login';
    // if (vm.isLoggedIn) {
    //     vm.text = 'Welcome';
    // }
})
