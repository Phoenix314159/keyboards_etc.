select * from Cart
join Products on Cart.productId = Products.ID
where customerId = $1
order by cartid asc;