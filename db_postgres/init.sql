-- CREATE DATABASE product_overview;

CREATE TABLE products (
 id SERIAL NOT NULL,
 name TEXT NOT NULL,
 slogan TEXT NOT NULL,
 description TEXT,
 category TEXT NOT NULL,
 default_price DECIMAL NOT NULL
);

ALTER TABLE products ADD CONSTRAINT products_pkey PRIMARY KEY (id);
COMMENT ON TABLE "products" IS 'This table will store the general product information.';

CREATE TABLE features (
 id SERIAL NOT NULL,
 product_id INTEGER NOT NULL,
 feature TEXT NOT NULL,
 value TEXT NOT NULL DEFAULT 'NULL'
);


ALTER TABLE features ADD CONSTRAINT features_pkey PRIMARY KEY (id);
COMMENT ON TABLE "features" IS 'This table will hold the various features of products. ';

CREATE TABLE styles (
 id SERIAL NOT NULL,
 product_id INTEGER NOT NULL,
 name TEXT NOT NULL,
 sale_price TEXT,
 original_price DECIMAL NOT NULL,
 default_style BOOLEAN NOT NULL DEFAULT 'false'
);


ALTER TABLE styles ADD CONSTRAINT styles_pkey PRIMARY KEY (id);
COMMENT ON TABLE "styles" IS 'This table holds the various styles of products. ';

CREATE TABLE photos (
 id SERIAL NOT NULL,
 style_id INTEGER NOT NULL,
 url  TEXT NOT NULL,
 thumbnail_url TEXT NOT NULL
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
COMMENT ON TABLE "photos" IS 'This table will hold product photo information. ';

CREATE TABLE skus (
 id SERIAL NOT NULL,
 style_id INTEGER NOT NULL,
 size TEXT NOT NULL,
 quantity INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE skus ADD CONSTRAINT skus_pkey PRIMARY KEY (id);
COMMENT ON TABLE "skus" IS 'This table will hold the various SKUs for product styles. ';

COPY  products (id, name, slogan, description, category, default_price)
FROM '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/product.csv'
DELIMITER ',' CSV HEADER;

COPY features (id, product_id, feature, value)
FROM '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/features.csv'
DELIMITER ',' CSV HEADER;

COPY styles (id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/styles.csv'
DELIMITER ',' CSV HEADER;

COPY skus (id, style_id, size, quantity)
FROM '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/skus.csv'
DELIMITER ',' CSV HEADER;

COPY photos (id, style_id, url, thumbnail_url)
FROM '/Users/anthony/Desktop/HR2/SDC/sdc-fruit-overview/init_data/photos.csv'
DELIMITER ',' CSV HEADER;

ALTER TABLE features ADD CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE photos ADD CONSTRAINT photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE skus ADD CONSTRAINT skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
