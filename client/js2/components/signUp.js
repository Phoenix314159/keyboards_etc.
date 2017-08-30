angular.module('ecom').component('signUp', {
    templateUrl: './views/signUp.html',
    controller: function (mainService, $timeout, $state) {
        let vm = this;
        vm.addNewUser = () => { //post request to add new user to users table
            mainService.signUp(vm.firstname, vm.lastname, vm.email, vm.username, vm.password).then(response => {
            })
        }
        vm.show = true;  //form is initially visible
        vm.goHome = () => {
            vm.show = false; //when sign up button is clicked, form disappears
            vm.number = 3;
            $timeout(() => {  //redirect counts down
                vm.number = 2;
                $timeout(() => {
                    vm.number = 1;
                    $timeout(() => {
                    }, 1000)
                }, 2000)
                $state.go('home'); //goes to home state in 3 seconds
            }, 3000)

        }
    }
})
