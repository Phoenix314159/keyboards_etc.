angular.module('ecom').directive('navBar', function () {
   return{
       restrict: 'E',
       template: `<div id="navbarNav1">
                        <ul class="navbar-nav mr-auto waves-effect waves-light" style="width:auto">
                              <li class="nav-item">
                                    <a class="nav-link" ui-sref="home">Home</a>
                              </li>
                              <li class="nav-item">
                                    <a class="nav-link" ui-sref="products({type:'allproducts'})">&nbsp;All
                                                                                                 Products</a>
                              </li>
                              <li class="nav-item">
                                    <a class="nav-link" ui-sref="shoppingCart">&nbsp;Shopping Cart</a>
                              </li>
                        </ul>
                        <form class="form-inline waves-effect waves-light">
                              <a class="animated fadeIn nav-link" ui-sref="login" ng-hide="main.user">Login</a>
                              <a class="animated fadeIn nav-link" ui-sref="signup" ng-hide="main.user">Sign-Up</a>
                              <a class="animated fadeIn nav-link" ng-click="main.logout()" ng-show="main.user">Logout</a>
                        </form>
                  </div>`
   }
});
