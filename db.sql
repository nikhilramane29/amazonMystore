create database amazon;
use amazon;

create table user(
id integer primary key auto_increment,
firstName varchar(100),
lastName varchar(100),
address varchar(100),
city varchar(100),
country varchar(100),
zip varchar(100),
 phone varchar(20),
email varchar(100),
password varchar(100),
createdOn timestamp default current_timestamp ,
active integer default  0,
activationToken varchar(100)
);

create table admin(
id integer primary key auto_increment,
firstName varchar(100),
lastName varchar(100),
phone varchar(20),
email varchar(100),
password varchar(100),
createdOn timestamp default current_timestamp ,
active integer default 1
);

create table category(
id integer primary key auto_increment,title varchar(50),
description varchar(100),
createdOn timestamp default current_timestamp
);

create table brand(
id integer primary key auto_increment,
title varchar(50),
description varchar(100),
createdOn timestamp default current_timestamp
);

create table product (
id integer primary key auto_increment,
title varchar(50),
description varchar(1000),
category integer,
price decimal,
brand integer,
image varchar(100),
isActive integer default 1,
createdOn timestamp default current_timestamp);

create table productReviews(
id integer primary key auto_increment,
review varchar(100),
userId integer,
productId integer,
rating decimal,
createdOn timestamp default current_timestamp
);

create table userOrder(
id integer primary key auto_increment,
userId integer,
totalAmount decimal,
tax decimal,
paymentType varchar(10),
paymentstatus varchar(10),
deliveryStatus varchar(10),
createdOn timestamp default current_timestamp
);

create table orderDetails(
id integer primary key auto_increment,
orderId integer,
productId integer,
price decimal,
quantity integer,
totalAmount decimal,
createdOn timestamp default current_timestamp
);

create table cart(
id integer primary key auto_increment,
productId integer,
userId integer,
price decimal,
quantity integer,
totalAmount decimal,
createdOn timestamp default current_timestamp
);


-- drop table user;
-- delete from user;
-- select * from user;
-- select * from admin;
-- select * from brand;
-- select * from category;
-- select * from product;
-- select * from userOrder;
-- select * from orderDetails;
-- select * from productReviews;

-- insert into productReviews(userId,productId,review,rating) values(1,1,'This is a nice product',4);
-- insert into productReviews(userId,productId,review,rating) values(2,1,'This is a worst product I have ever seen',1);
-- alter table product add column isActive integer default 1;
--   update user set active =1 where firstname='nikhil';
--  update user set activationToken='' where active =1;
--  insert into user(firstName,lastName,email,password) values('nikhil','ramane', 'nikhilramane29@gmail.com','test');

-- use amazon;
-- insert into category (title,description) values('Electronics','electronics products');
-- insert into category (title,description) values('Home Decoration','home decoration');
-- insert into category (title,description) values('Computers','computers');
-- insert into category (title,description) values('Mobiles','mobiles');

-- insert into brand (title,description) values('Apple','The best brand on this planet');
-- insert into brand (title,description) values('Samsung','samsung');
-- insert into brand (title,description) values('Sony','sony');
-- insert into brand (title,description) values('OnePlus','oneplus');
