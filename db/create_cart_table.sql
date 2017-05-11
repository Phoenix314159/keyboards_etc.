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

update cart
set totalprice = $1
from(select * from products
     join cart
     on products.id = cart.productId
);
update cart set totalprice = (
select price, productId from products
join cart
on products.id = cart.productId(select price where productid = $1)
)
update cart set totalprice = (
select * from products
join cart
on products.id = cart.productId where productid = 2
)

(
update cart.totalprice
set totalprice = $1;
 )

 update cart set totalprice = $1
 from products
 where cart.productId = products.id;

UPDATE cart INNER JOIN products on cart.productId = products.id
SET cart.totalprice = products.price
WHERE table1.column3 = 'randomCondition';

UPDATE cart
  SET cart.totalprice = products.price
  FROM cart AS a
  INNER JOIN products AS b
  ON a.productId = b.id;



