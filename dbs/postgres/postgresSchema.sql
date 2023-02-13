-- Use beblow two lines when needs to recreate the database

-- DROP DATABASE IF EXISTS products;
-- CREATE DATABASE products;

DROP TABLE IF EXISTS styles, products, features, related, photos, skus;

CREATE TABLE products (
  id integer NOT NUll,
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(255) NOT NULL,
  default_price VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE styles (
  id integer NOT NULL,
  productId integer NOT NULL REFERENCES products(id),
  name varchar,
  sale_price integer,
  original_price integer,
  default_style boolean,
  PRIMARY KEY (id)
);

CREATE TABLE features (
  id integer NOT NULL,
  product_id integer NOT NULL REFERENCES products(id),
  feature varchar(255) NOT NULL,
  value varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE related (
  id integer NOT NULL,
  current_product_id INT NOT NULL REFERENCES products(id),
  related_product_id INT NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE photos (
  id integer NOT NULL,
  styleId INT NOT NULL REFERENCES styles(id),
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE skus (
  id integer NOT NULL,
  styleId INT NOT NULL REFERENCES styles(id),
  size VARCHAR(20) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id)
);

-- Initialize database with local db backup files
COPY products FROM '/Users/liuqian/Desktop/CS learning_Hack Reactor /2209 HR immersive course/SDC/SDC-Product-API/data/product.csv' (format csv, null "null", DELIMITER ',', HEADER);
COPY styles FROM '/Users/liuqian/Desktop/CS learning_Hack Reactor /2209 HR immersive course/SDC/SDC-Product-API/data/styles.csv' (format csv, null "null", DELIMITER ',', HEADER);
COPY features FROM '/Users/liuqian/Desktop/CS learning_Hack Reactor /2209 HR immersive course/SDC/SDC-Product-API/data/features.csv' (format csv, null "null", DELIMITER ',', HEADER);
COPY related FROM '/Users/liuqian/Desktop/CS learning_Hack Reactor /2209 HR immersive course/SDC/SDC-Product-API/data/related.csv' (format csv, null "null", DELIMITER ',', HEADER);
COPY photos FROM '/Users/liuqian/Desktop/CS learning_Hack Reactor /2209 HR immersive course/SDC/SDC-Product-API/data/photos.csv' (format csv, null "null", DELIMITER ',', HEADER);
COPY skus FROM '/Users/liuqian/Downloads/skus.csv' (format csv, null "null", DELIMITER ',', HEADER);

-- Create inidices on tables primary keys
CREATE INDEX idx_id_products ON products (id);
CREATE INDEX idx_productsId_styles ON styles (productId);
CREATE INDEX idx_productid_features ON features (product_id);
CREATE INDEX idx_styleId_skus on skus (styleId);
CREATE INDEX idx_styleid_styles ON styles (id);
CREATE INDEX idx_styleId_photos ON photos(styleId);
CREATE INDEX idx_id_related ON related(current_product_id);