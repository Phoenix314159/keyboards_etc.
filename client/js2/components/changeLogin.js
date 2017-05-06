angular.module('ecom').component('changeLogin', {
    template: '<div>{{text}}</div>',
    require: {
        parent: '^mainComp'
    },
    controller: function ($scope) {
        let vm = this;
        vm.$onInit = () => {
            $scope.text = vm.parent.change();
            console.log(vm.text);
        }
    }
});
