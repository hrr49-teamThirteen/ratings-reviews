CREATE TABLE products (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_name varchar(120),
  department varchar(50)
);

CREATE TABLE rateable_attributes (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  attributeName varchar(50)
);

CREATE TABLE users (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username varchar(50)
);

CREATE TABLE images (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  prod_id int,
  loc varchar(250),
  FOREIGN KEY (prod_id) REFERENCES products(id)
);

CREATE TABLE reviews (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username varchar(100),
  body varchar(1000),
  star_rating tinyint,
  helpfulness_score tinyint,
  image_path varchar(250)
);

-- I'm leaving this here because procedures are cool :D

-- DROP PROCEDURE IF EXISTS TRANSFER_ATTRIBUTES;
-- DELIMITER ;;

-- CREATE PROCEDURE TRANSFER_ATTRIBUTES()
-- BEGIN
-- DECLARE n int DEFAULT 0;
-- DECLARE i int DEFAULT 0;
-- SELECT COUNT(*) FROM rateable_attributes INTO n;
-- SET i=0;
-- WHILE i<n DO
--   ALTER TABLE reviews
--   ADD COLUMN (SELECT attribute_name FROM rateable_attributes
--               WHERE 'id' = i) tinyint NOT NULL;
--   SET i = i + 1;
--   END WHILE;
--   END;
--   ;;

-- DELIMITER ;

-- CALL TRANSFER_ATTRIBUTES();