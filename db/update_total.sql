update cart
set totalprice = $1
from cart as a
inner join products as b
on a.productId = b.id;