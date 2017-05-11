select sum(price) from products
join cart
on products.id = cart.productId;
