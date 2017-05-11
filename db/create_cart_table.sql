 create table Cart(
     cartId serial primary key,
     customerId int references Users(ID),
     productId int references Products(ID),
     quantity int
);

alter table cart
add totalprice int;

update cart
set totalprice = $1;

select distinct totalprice from cart;

select * from products
join cart
on products.id = cart.productId;