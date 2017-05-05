angular.module('ecom').directive('shipping', function () {
   return {
       restrict: 'E',
       template: `<div>Shipping is <br/> $1.99 per item</div>`
   }
});
