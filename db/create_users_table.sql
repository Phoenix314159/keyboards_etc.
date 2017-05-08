create table Users(
    ID  serial primary key,
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255),
    username varchar(255),
    password varchar(255)
);


insert into Users(firstname, lastname, email, username, password)
values('John', 'DOE', 'dude@dude.com', 'john1','1');