 create table Cart(
     customerId int references Users(ID),
     productId int references Products(ID),
     quantity int

);
alter table Cart add column cartId  serial primary key