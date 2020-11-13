CREATE TABLE rateable_attributes (
  id int AUTO_INCREMENT PRIMARY KEY,
  attribute_name varchar(50)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50)
);

CREATE TABLE images (
  id int NOT NULL AUTO_INCREMENT,
  loc varchar(100)
);

CREATE TABLE reviews (
  id int AUTO_INCREMENT,
  user_id smallint,
  star_rating tinyint,
  helpfulness_score tinyint,
  image_id int,
  PRIMARY KEY (id),
  FOREIGN KEY user_id REFERENCES users(id),
  FOREIGN KEY image_id REFERENCES images(id)
);

DROP PROCEDURE IF EXISTS TRANSFER_ATTRIBUTES;
DELIMITER ;;

CREATE PROCEDURE TRANSFER_ATTRIBUTES()
BEGIN
DECLARE n int DEFAULT 0;
DECLARE i int DEFAULT 0;
SELECT COUNT(*) FROM rateable_attributes INTO n;
SET i=0;
WHILE i<n DO
  ALTER TABLE reviews
  ADD COLUMN (SELECT attribute_name FROM rateable_attributes
              WHERE 'id' = i) tinyint NOT NULL;
  SET i = i + 1;
  END WHILE;
  END;
  ;;

  DELIMITER ;

  CALL TRANSFER_ATTRIBUTES();