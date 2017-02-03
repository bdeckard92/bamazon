CREATE DATABASE bamazonDB

USE bamazonDB

CREATE TABLE products (
	id INTEGER(11) auto_increment NOT NULL primary key,
    item_id INTEGER(30) NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NUll,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
    )
    
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Cordless Extension Cord", "Hardware", 26.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Pacifist Hammer", "Hardware", 45.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Dehydrated Water", "Camping", 26.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "No Kill Mosquito Trap", "Camping", 26.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Clear Tent", "Camping", 26.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Soft Nails", "Hardware", 1.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Oderless Air Freshener", "Home Goods", 7.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Fireproof Kindleing", "Camping", 8.88, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Self Cleaning Sponge", "Home Goods", 10.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Artificial Pillow", "Home Goods", 43.99, 10);

UPDATE products
SET item_id = 8
WHERE id = 8;