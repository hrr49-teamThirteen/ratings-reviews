CREATE TABLE products (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_name varchar(120),
  image_path varchar(120),
  department varchar(50)
);

CREATE TABLE rateable_attributes (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  attribute_name varchar(50)
);

CREATE TABLE users (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username varchar(50)
);

CREATE TABLE images (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  loc varchar(100)
);

CREATE TABLE reviews (
  id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  userid int,
  body varchar(300),
  star_rating tinyint,
  helpfulness_score tinyint,
  image_id int,
  FOREIGN KEY (userid) REFERENCES users(id),
  FOREIGN KEY (image_id) REFERENCES images(id)
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