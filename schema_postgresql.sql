/*
installation:
sudo apt install postgresql -y

login:
sudo -u postgres psql
create database reviewsdb;
psql -f schema_postgresql.sql -p 5432 -U postgres -d reviewsdb;
CREATE USER student with PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE reviewsdb to student;
GRANT CONNECT ON DATABASE reviewsdb TO student;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO student;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO student;
*/


CREATE TABLE "products" (
	"id" serial NOT NULL,
	"product_name" varchar(120) NOT NULL,
  CONSTRAINT "products_pk" PRIMARY KEY ("id")
);

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(50) NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "images" (
	"id" serial NOT NULL,
	"loc" varchar(250) NOT NULL,
	"review_id" int NOT NULL,
  CONSTRAINT "images_pk" PRIMARY KEY ("id")
);

CREATE TABLE "reviews" (
	"id" serial NOT NULL,
	"title" varchar(150) NOT NULL,
	"date" text,
	"body" varchar(1000) NOT NULL,
	"star_rating" int NOT NULL DEFAULT '0',
	"user_id" int NOT NULL,
	"prod_id" int NOT NULL,
  CONSTRAINT "reviews_pk" PRIMARY KEY ("id")
);

ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE;
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("prod_id") REFERENCES "products"("id") ON DELETE CASCADE;

/* Foreign Key Indexes: */
CREATE INDEX images_review_id_index ON images (review_id);
CREATE INDEX reviews_user_id_index ON reviews (user_id);
CREATE INDEX reviews_prod_id_index ON reviews (prod_id);
