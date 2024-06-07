CREATE TABLE orders (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productId INT,
    orderId INT,
    FOREIGN KEY (orderId) REFERENCES orders(orderId)
    ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO orders (firstname, surname) VALUES ('John', 'Doe');
INSERT INTO orders (firstname, surname) VALUES ('Jane', 'Smith');
INSERT INTO orders (firstname, surname) VALUES ('Alice', 'Johnson');

INSERT INTO products (productId, orderId) VALUES (1, 1);
INSERT INTO products (productId, orderId) VALUES (2, 1);
INSERT INTO products (productId, orderId) VALUES (3, 2);
INSERT INTO products (productId, orderId) VALUES (1, 3);
INSERT INTO products (productId, orderId) VALUES (2, 3);
