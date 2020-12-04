DROP DATABASE IF EXISTS reviewsDB;
CREATE DATABASE reviewsDB;
USE reviewsDB;

CREATE TABLE products (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_name varchar(120)
);

CREATE TABLE users (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username varchar(50)
);

CREATE TABLE images (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  prod_id int,
  loc varchar(250)
);

CREATE TABLE reviews (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title varchar(50),
  datePosted datetime NOT NULL,
  body varchar(1000),
  star_rating tinyint,
  user_id int,
  prod_id int
);

ALTER TABLE reviews ADD FOREIGN KEY fk_reviews_products (products_id) REFERENCES products (id);
ALTER TABLE reviews ADD FOREIGN KEY fk_reviews_user (user_id) REFERENCES products (id);