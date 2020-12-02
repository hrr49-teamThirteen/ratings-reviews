DROP DATABASE IF EXISTS reviewsDB;
CREATE DATABASE reviewsDB;
USE reviewsDB;

CREATE TABLE products (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_name varchar(120),
  department varchar(50)
);

/*CREATE TABLE rateable_attributes (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  attributeName varchar(50)
);*/

CREATE TABLE users (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username varchar(50)
);

CREATE TABLE images (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  prod_id int,
  loc varchar(250)/*,
  FOREIGN KEY (prod_id) REFERENCES products(id)*/
);

CREATE TABLE reviews (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title varchar(50),
  datePosted datetime NOT NULL,
  username varchar(100),
  body varchar(1000),
  star_rating tinyint,
  helpfulness_score tinyint,
  image_path varchar(250)
);