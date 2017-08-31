!function(){"use strict";angular.module("ecom",["ui.router","angular-stripe","angular-parallax"]).config(["$urlRouterProvider","$stateProvider","stripeProvider",function(t,n,e){e.setPublishableKey("pk_test_YCIPURTU6ePqrjERaHH1AHMN");n.state("home",{url:"/",template:"<home></home>",component:"home"}).state("login",{url:"/login",template:"<login></login>",component:"login"}).state("signup",{url:"/signup",template:"<sign-up></sign-up>",component:"signUp"}).state("products",{url:"/products/:type",template:"<products></products>",component:"products"}).state("shoppingCart",{url:"/shopping-cart",template:"<shopping-cart></shopping-cart>",component:"shoppingCart"}).state("productDetails",{url:"/productsdetails/:id",template:"<product-details></product-details>",component:"productDetails"}).state("user",{url:"/products",templateUrl:"./views/user.html"}).state("payment",{url:"/payment",template:"<payment></payment>",component:"payment"});t.otherwise("/")}]);angular.module("ecom").component("home",{templateUrl:"./views/home.html",controller:["mainService",function(t){var n=this;n.product3=[];n.subscribe=function(){alert("Thank you for subscribing "+n.name)};t.getCustomerInfo().then(function(t){n.customer=t.data});t.getProductById2(16).then(function(e){t.getProductById2(5).then(function(o){t.getProductById2(29).then(function(t){n.product16=e.data[0];n.product3.push(n.product16);n.product5=o.data[0];n.product3.push(n.product5);n.product29=t.data[0];n.product3.push(n.product29)})})});n.addToCart=function(e){t.addToCart(n.customer.id,e,1).then(function(t){})}}]});angular.module("ecom").component("login",{templateUrl:"./views/login.html",require:{main:"^mainComp"},controller:["mainService","$timeout","$state",function(t,n,e){var o=this;o.login=function(){t.login(o.username,o.password).then(function(n){t.deleteAllFromCart().then(function(t){});t.getCustomerInfo().then(function(t){o.name=t.data.firstname;o.check()})})};o.$onInit=function(){o.check=function(){o.main.checkLogin()}};o.show=!0;o.goHome=function(){o.show=!1;o.number=3;n(function(){o.number=2;n(function(){o.number=1;n(function(){},1e3)},2e3);e.go("home")},3e3)}}]});angular.module("ecom").component("mainComp",{templateUrl:"./views/mainComp.html",controllerAs:"main",controller:["$http","mainService","$state",function(t,n,e){var o=this;o.checkLogin=function(){n.checkLogin().then(function(t){t.data.user&&(o.user=!0)})};o.checkLogin();o.logged=function(){if(o.user)return!0};o.logout=function(){n.logout().then(function(t){o.data=t.data;o.user=!1;e.go("home")})}}]});angular.module("ecom").component("payment",{require:{parent:"^mainComp"},templateUrl:"./views/payment.html",controller:["stripe","$http","mainService","modelFactory","$state","$timeout",function(t,n,e,o,a,r){var i=this;i.payment={};i.amount=o.getTotal();i.showP=!0;i.show=function(){i.showP=!1};i.charge=function(){e.deleteAllFromCart().then(function(t){});return t.card.createToken(i.payment.card).then(function(t){console.log("token created for card ending in ",t.card.last4);var e=angular.copy(i.payment);e.card=void 0;e.token=t.id;e.amount=Number(100*i.amount);return n.post("http://www.keyboardsetc.net/api/payments",e)}).then(function(t){console.log("successfully submitted payment for $",t.amount)}).catch(function(t){t.type&&/^Stripe/.test(t.type)?console.log("Stripe error: ",t.message):console.log("Other error occurred, possibly with your API",t.message)})};i.goHome=function(){r(function(){r(function(){r(function(){r(function(){r(function(){r(function(){r(function(){r(function(){r(function(){r(function(){a.go("home")},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)}}]});angular.module("ecom").component("productDetails",{templateUrl:"./views/product-details.html",controller:["mainService","$stateParams",function(t,n){var e=this;e.getProducts=function(){t.getProducts().then(function(t){e.products=t.data;e.product1=n.id})};e.getProducts();t.getProductById().then(function(t){e.product=t.data[0]});t.getCustomerInfo().then(function(t){e.customer=t.data});e.addToCart=function(n){t.addToCart(e.customer.id,n,1).then(function(t){})}}]});angular.module("ecom").component("products",{templateUrl:"./views/products.html",controller:["mainService","$stateParams",function(t,n){var e=this;t.getCustomerInfo().then(function(t){e.customer=t.data});e.getProductsByType=function(){t.getProductsByType(n.type).then(function(t){e.products=t.data})};e.getProductsByType();e.addToCart=function(n){t.addToCart(e.customer.id,n,1).then(function(t){})}}]});angular.module("ecom").component("shoppingCart",{templateUrl:"./views/shopping-cart.html",require:{main:"^mainComp"},controller:["mainService","modelFactory",function(t,n){var e=this;e.showCart=!1;e.showBox2=!0;e.show2=!1;e.$onInit=function(){e.show=e.main.logged();if(e.show){e.showBox=!0;e.show2=!0}else e.showBox=!1};e.message1="You have no items in your cart";e.message2="Please log in to add items to your cart";t.getCustomerInfo().then(function(o){e.customer=o.data;t.getCart(e.customer.id).then(function(t){if(t.data.length>0){e.showCart=!0;e.show2=!1;e.products=t.data.map(function(t){t.total=t.price*t.quantity;return t});e.cartTotal=0;e.quantityTotal=0;for(var n=0;n<e.products.length;n++){e.cartTotal+=e.products[n].total;e.quantityTotal+=e.products[n].quantity}e.qTotal=1.99*e.quantityTotal;e.gTotal=e.cartTotal+e.qTotal}});e.updateTotal=function(n,o){t.updateQuantity(n,o).then(function(n){t.getCart(e.customer.id).then(function(t){e.cart=t.data;e.cart1=e.cart[0].cartid;if(e.cart.length>0){e.showCart=!0;e.products=t.data.map(function(t){t.total=t.price*t.quantity;return t});e.cartTotal=0;e.quantityTotal=0;for(var n=0;n<e.products.length;n++){e.cartTotal+=e.products[n].total;e.quantityTotal+=e.products[n].quantity}e.qTotal=1.99*e.quantityTotal;e.gTotal=e.cartTotal+e.qTotal;e.pId=!1;if(0===e.quantityTotal){e.pId=!0;if(0===e.cart.length){e.showCart=!1;e.show2}}}})})};e.displayTotal=function(){n.displayTotal(e.gTotal)};e.deleteFromCart=function(n){t.deleteFromCart(n).then(function(n){t.getCart(e.customer.id).then(function(t){if(t.data.length>0){e.showCart=!0;e.products=t.data}else if(0===t.data.length){e.showCart=!1;e.show2=!0}else e.showCart=!1})})}})}]});angular.module("ecom").component("signUp",{templateUrl:"./views/signUp.html",controller:["mainService","$timeout","$state",function(t,n,e){var o=this;o.addNewUser=function(){t.signUp(o.firstname,o.lastname,o.email,o.username,o.password).then(function(t){})};o.show=!0;o.goHome=function(){o.show=!1;o.number=3;n(function(){o.number=2;n(function(){o.number=1;n(function(){},1e3)},2e3);e.go("home")},3e3)}}]});angular.module("ecom").component("timeOut",{templateUrl:"./views/user.html",controller:["$timeout","$state",function(t,n){var e=this;e.count=3;t(function(){t(function(){t(function(){e.count=1},1e3);e.count=2},2e3);n.go("home")},3e3)}]});angular.module("angular-parallax",[]).directive("parallax",["$window",function(t){return{restrict:"A",scope:{parallaxRatio:"@",parallaxVerticalOffset:"@",parallaxHorizontalOffset:"@"},link:function(n,e,o){var a=function(){n.parallaxHorizontalOffset||(n.parallaxHorizontalOffset="0");var o=t.pageYOffset*(n.parallaxRatio?n.parallaxRatio:1.1);if(o<=t.innerHeight){var a=o<n.parallaxVerticalOffset?n.parallaxVerticalOffset:o;var r=-1===n.parallaxHorizontalOffset.indexOf("%")?n.parallaxHorizontalOffset+"px":n.parallaxHorizontalOffset;e.css("transform","translate("+r+", "+a+"px)")}};a();angular.element(t).bind("scroll",a);angular.element(t).bind("touchmove",a)}}}]).directive("parallaxBackground",["$window",function(t){return{restrict:"A",transclude:!0,template:"<div ng-transclude></div>",scope:{parallaxRatio:"@",parallaxVerticalOffset:"@"},link:function(n,e,o){var a=function(){var o=(e.prop("offsetTop")-t.pageYOffset)*(n.parallaxRatio?n.parallaxRatio:1.1)-(n.parallaxVerticalOffset||0);e.css("background-position","50% "+o+"px")};angular.element(t).bind("load",function(t){a();n.$apply()});angular.element(t).bind("scroll",a);angular.element(t).bind("touchmove",a)}}}]);angular.module("ecom").directive("backGround",["$timeout","$interval",function(t,n){return{restrict:"A",link:function(t,e,o){e.css({"background-image":"https://previews.123rf.com/images/tzido/tzido1508/tzido150800637/43812432-music-studio-Stock-Photo-recording.jpg"});var a=["http://goldwallpapers.com/uploads/posts/music-studio-backgrounds/music_studio_backgrounds_020.jpg","https://s-media-cache-ak0.pinimg.com/originals/ec/05/cb/ec05cbb0226b7637330c4850b6f171a5.jpg","http://breweryrecording.com/img/gallery/control-1.jpg","https://s-media-cache-ak0.pinimg.com/originals/04/dc/27/04dc275cfd874e45ee542bafff3f73e7.jpg","http://www.blackbird-music-studio.de/wp-content/uploads/2015/02/Blackbird-Music-Studio_Pre-Production-Suite_web.jpg","https://s-media-cache-ak0.pinimg.com/originals/c1/87/28/c187284a8ab128e30bc61c8ef4882b1c.jpg","https://s-media-cache-ak0.pinimg.com/originals/00/f2/38/00f2388ba69f258604b6058d9f5a46b7.jpg","https://www.workinentertainment.com/blog/wp-content/uploads/2016/03/home-music-studio.jpg","https://i.ytimg.com/vi/1rKJSN5dSYI/maxresdefault.jpg"];var r=-1;n(function(){a.forEach(function(t){(new Image).src=t});r++;r===a.length&&(r=0);var t="url("+a[r]+")";e.css({"background-image":t,"background-attachment":"fixed","background-repeat":"no-repeat","background-position":"center","background-blend-mode":"darken","background-size":"cover",opacity:".90",transition:"1.7s","-webkit-backface-visibility":"hidden",height:"100%",width:"100%"})},1e4)}}}]);angular.module("ecom").directive("buttonD",function(){return{restrict:"A",link:function(t,n,e){n.on("click",function(){n.html("ADDED TO CART")})}}});angular.module("ecom").directive("countDown",["$timeout",function(t){return{restrict:"A",template:"<div>{{number}}</div>",link:function(n,e,o){n.number=3;t(function(){n.number=2;t(function(){n.number=1;t(function(){},1e3)},1e3)},1e3)}}}]);angular.module("ecom").directive("countDown2",["$timeout",function(t){return{restrict:"A",template:"<div>{{number}}</div>",link:function(n,e,o){n.number=10;t(function(){n.number=9;t(function(){n.number=8;t(function(){n.number=7;t(function(){n.number=6;t(function(){n.number=5;t(function(){n.number=4;t(function(){n.number=3;t(function(){n.number=2;t(function(){n.number=1},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)},1e3)}}}]);angular.module("ecom").directive("navBar",function(){return{restrict:"E",template:'<div id="navbarNav1">\n                        <ul class="navbar-nav mr-auto waves-effect waves-light" style="width:auto">\n                              <li class="nav-item">\n                                    <a class="nav-link" ui-sref="home">Home</a>\n                              </li>\n                              <li class="nav-item">\n                                    <a class="nav-link" ui-sref="products({type:\'allproducts\'})">&nbsp;All\n                                                                                                 Products</a>\n                              </li>\n                              <li class="nav-item">\n                                    <a class="nav-link" ui-sref="shoppingCart">&nbsp;Shopping Cart</a>\n                              </li>\n                        </ul>\n                        <form class="form-inline waves-effect waves-light">\n                              <a class="animated fadeIn nav-link" ui-sref="login" ng-hide="main.user">Login</a>\n                              <a class="animated fadeIn nav-link" ui-sref="signup" ng-hide="main.user">Sign-Up</a>\n                              <a class="animated fadeIn nav-link" ng-click="main.logout()" ng-show="main.user">Logout</a>\n                        </form>\n                  </div>'}});angular.module("ecom").directive("shipping",function(){return{restrict:"E",template:"<div>Shipping is <br/> $1.99 per item</div>"}});angular.module("ecom").service("mainService",["$http","$stateParams",function(t,n){var e=this;e.getCustomerInfo=function(){return t({method:"GET",url:"/api/me"})};e.getProducts=function(){return t({method:"GET",url:"/api/products"})};e.getProductsByType=function(n){return t({method:"GET",url:"/api/products/"+n})};e.getProductById=function(){return t({method:"GET",url:"/api/product/"+n.id})};e.getProductById2=function(n){return t({method:"GET",url:"/api/product/"+n})};e.signUp=function(n,e,o,a,r){return t({method:"POST",data:{firstname:n,lastname:e,email:o,username:a,password:r},url:"/api/newuser"})};e.getCart=function(n){return t({method:"GET",url:"/api/cart/"+n})};e.addToCart=function(n,e,o){return t({method:"POST",data:{customerId:n,productId:e,quantity:o},url:"/api/addtocart"})};e.deleteFromCart=function(n){return t({method:"DELETE",url:"/api/delete/"+n})};e.deleteAllFromCart=function(){return t({method:"DELETE",url:"/api/deleteall"})};e.updateQuantity=function(n,e){return t({method:"PUT",data:{id:n,quantity:e},url:"/api/updatequantity"})};e.login=function(n,e){return t({method:"POST",data:{username:n,password:e},url:"/api/login"})};e.logout=function(){return t({method:"GET",url:"/api/logout"})};e.checkLogin=function(){return t({method:"GET",url:"/api/checklogin"})}}]);angular.module("ecom").factory("modelFactory",function(){var t=[];return{displayTotal:function(n){t.push(n)},getTotal:function(){for(;t.length>1;)t.shift();return t[0]}}})}();
//# sourceMappingURL=bundle.js.map
