"use strict";angular.module("ecom",["ui.router"]).config(["$urlRouterProvider","$stateProvider",function(t,e){e.state("home",{url:"/",template:"<home></home>",component:"home"}).state("login",{url:"/login",template:"<login></login>",component:"login"}).state("signup",{url:"/signup",template:"<sign-up></sign-up>",component:"signUp"}).state("products",{url:"/products/:type",template:"<products></products>",component:"products"}).state("shoppingCart",{url:"/shopping-cart",template:"<shopping-cart></shopping-cart>",component:"shoppingCart"}).state("productDetails",{url:"/productdetails",template:"<product-details></product-details>",component:"productDetails"}).state("user",{url:"/products",templateUrl:"./views/user.html"}).state("payment",{url:"/payment",templateUrl:"<payment></payment>",component:"payment"}),t.otherwise("/")}]),angular.module("ecom").component("home",{templateUrl:"./views/home.html",controller:["mainService",function(t){var e=this;e.subscribe=function(){alert("Thank you for subscribing "+e.name)}}]}),angular.module("ecom").component("login",{templateUrl:"./views/login.html",require:{main:"^mainComp"},controller:["mainService","$timeout","$state",function(t,e,o){var n=this;n.$onInit=function(){n.login=function(){n.main.login(n.username,n.password).then(function(e){console.log(e),t.deleteAllFromCart().then(function(t){}),t.getCustomerInfo().then(function(t){n.name=t.data.firstname})})}},n.show=!0,n.goHome=function(){n.show=!1,n.number=3,e(function(){n.number=2,e(function(){n.number=1,e(function(){},1e3)},2e3),o.go("home")},3e3)}}]}),angular.module("ecom").component("mainComp",{templateUrl:"./views/mainComp.html",controllerAs:"main",controller:["$http","mainService","$state",function(t,e,o){var n=this;n.text="Login",n.login=function(e,o){return n.text="Logout",n.loggedIn=!0,t({method:"POST",data:{username:e,password:o},url:"http://localhost:3055/api/login"})},n.logout=function(){e.logout().then(function(t){n.data=t.data,console.log(n.data),n.text="Login",o.go("home")})}}]}),angular.module("ecom").component("payment",{templateUrl:"./views/payment.html",controller:function(){}}),angular.module("ecom").component("productDetails",{templateUrl:"./views/product-details.html"}),angular.module("ecom").component("products",{templateUrl:"./views/products.html",controller:["mainService",function(t){var e=this;e.getProducts=function(){t.getProducts().then(function(t){e.products=t.data})},e.getProducts(),t.getCustomerInfo().then(function(t){e.customer=t.data}),e.addToCart=function(o){t.addToCart(e.customer.id,o,1).then(function(t){})}}]}),angular.module("ecom").component("shoppingCart",{templateUrl:"./views/shopping-cart.html",controller:["mainService",function(t){var e=this;e.showCart=!1,t.getCustomerInfo().then(function(o){e.customer=o.data,t.getCart(e.customer.id).then(function(t){if(t.data.length>0){e.showCart=!0,e.products=t.data.map(function(t){return t.total=t.price*t.quantity,t}),e.cartTotal=0,e.quantityTotal=0;for(var o=0;o<e.products.length;o++)e.cartTotal+=e.products[o].total,e.quantityTotal+=e.products[o].quantity;e.qTotal=1.99*e.quantityTotal,e.gTotal=e.cartTotal+e.qTotal}}),e.updateTotal=function(o,n){t.updateQuantity(o,n).then(function(o){t.getCart(e.customer.id).then(function(t){if(t.data.length>0){e.showCart=!0,e.products=t.data.map(function(t){return t.total=t.price*t.quantity,t}),e.cartTotal=0,e.quantityTotal=0;for(var o=0;o<e.products.length;o++)e.cartTotal+=e.products[o].total,e.quantityTotal+=e.products[o].quantity;e.qTotal=1.99*e.quantityTotal,e.gTotal=e.cartTotal+e.qTotal}})})},e.deleteFromCart=function(o){t.deleteFromCart(o).then(function(o){t.getCart(e.customer.id).then(function(t){t.data.length>0?(e.showCart=!0,e.products=t.data):e.showCart=!1})})}})}]}),angular.module("ecom").component("signUp",{templateUrl:"./views/signUp.html",controller:["mainService","$timeout","$state",function(t,e,o){var n=this;n.addNewUser=function(){t.signUp(n.firstname,n.lastname,n.email,n.username,n.password).then(function(t){})},n.show=!0,n.goHome=function(){n.show=!1,n.number=3,e(function(){n.number=2,e(function(){n.number=1,e(function(){},1e3)},2e3),o.go("home")},3e3)}}]}),angular.module("ecom").component("timeOut",{templateUrl:"./views/user.html",controller:["$timeout","$state",function(t,e){var o=this;o.count=3,t(function(){t(function(){t(function(){o.count=1},1e3),o.count=2},2e3),e.go("home")},3e3)}]}),angular.module("ecom").controller("loginCtrl",["mainService",function(t){}]),angular.module("ecom").controller("mainCtrl",["$scope","$http",function(t,e){}]),angular.module("ecom").directive("buttonD",function(){return{restrict:"A",link:function(t,e,o){e.on("click",function(){e.html("ADDED TO CART")})}}}),angular.module("ecom").directive("changeText",["mainService",function(t){}]),angular.module("ecom").directive("countDown",["$timeout",function(t){return{restrict:"A",template:"<div>{{number}}</div>",link:function(e,o,n){e.number=3,t(function(){e.number=2,t(function(){e.number=1,t(function(){},1e3)},1e3)},1e3)}}}]),angular.module("ecom").directive("login2",["mainService",function(t){}]),angular.module("ecom").directive("shipping",function(){return{restrict:"E",template:"<div>Shipping is <br/> $1.99 per item</div>"}}),angular.module("ecom").service("mainService",["$http","$stateParams",function(t,e){var o="http://localhost:3055",n=this;n.getCustomerInfo=function(){return t({method:"GET",url:o+"/api/me"})},n.getProducts=function(){return t({method:"GET",url:o+"/api/products/"+e.type})},n.getProductById=function(e){return t({method:"GET",url:o+"/api/products/"+e})},n.signUp=function(e,n,r,a,u){return t({method:"POST",data:{firstname:e,lastname:n,email:r,username:a,password:u},url:o+"/api/newuser"})},n.getCart=function(e){return t({method:"GET",url:o+"/api/cart/"+e})},n.addToCart=function(e,n,r){return t({method:"POST",data:{customerId:e,productId:n,quantity:r},url:o+"/api/addtocart"})},n.deleteFromCart=function(e){return t({method:"DELETE",url:o+"/api/delete/"+e})},n.deleteAllFromCart=function(){return t({method:"DELETE",url:o+"/api/deleteall"})},n.updateQuantity=function(e,n){return t({method:"PUT",data:{id:e,quantity:n},url:o+"/api/updatequantity"})},n.logout=function(){return t({method:"GET",url:o+"/api/logout"})}}]),angular.module("ecom").factory("modelFactory",["$http",function(t){}]);
//# sourceMappingURL=bundle.js.map
