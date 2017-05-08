 create table Cart(
     cartId serial primary key,
     customerId int references Users(ID),
     productId int references Products(ID),
     quantity int
);
