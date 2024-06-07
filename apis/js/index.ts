import { serve } from "bun";
import { createConnection } from "mysql2/promise";

const PORT = process.env.PORT || 2000;

const connection = await createConnection({
  host: process.env.MYSQL_SERVICE_PORT_3306_TCP_ADDR,
  port: Number(process.env.MYSQL_SERVICE_SERVICE_PORT),
  user: "root",
  password: "admin",
  database: process.env.MYSQL_DB_NAME,
});

const CORS_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST",
    "Access-Control-Allow-Headers": "Content-Type",
  },
};

serve({
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === "/orders" && method === "POST") {
      const { firstname, surname } = await request.json();
      const [result] = await connection.execute(
        "INSERT INTO orders (firstname, surname) VALUES (?, ?)",
        [firstname, surname]
      );
      return new Response(JSON.stringify({ orderId: result.insertId }), {
        ...CORS_HEADERS,
        status: 201,
      });
    } else if (path.startsWith("/orders/") && method === "GET") {
      const orderId = path.split("/")[2];
      const [rows] = await connection.execute(
        "SELECT * FROM orders WHERE orderId = ?",
        [orderId]
      );
      return new Response(JSON.stringify(rows[0] || {}), {
        ...CORS_HEADERS,
        status: 200,
      });
    } else if (path.startsWith("/orders") && method === "GET") {
      const [rows] = await connection.execute("SELECT * FROM orders");
      return new Response(JSON.stringify(rows || []), {
        ...CORS_HEADERS,
        status: 200,
      });
    } else if (path.startsWith("/orders/") && method === "PUT") {
      const orderId = path.split("/")[2];
      const { firstname, surname } = await request.json();
      await connection.execute(
        "UPDATE orders SET firstname = ?, surname = ? WHERE orderId = ?",
        [firstname, surname, orderId]
      );
      return new Response(null, { ...CORS_HEADERS, status: 204 });
    } else if (path.startsWith("/orders/") && method === "DELETE") {
      const orderId = path.split("/")[2];
      await connection.execute("DELETE FROM orders WHERE orderId = ?", [
        orderId,
      ]);
      return new Response(null, { ...CORS_HEADERS, status: 204 });
    }

    if (path === "/products" && method === "POST") {
      const { productId, orderId } = await request.json();
      const [result] = await connection.execute(
        "INSERT INTO products (productId, orderId) VALUES (?, ?)",
        [productId, orderId]
      );
      return new Response(JSON.stringify({ id: result.insertId }), {
        ...CORS_HEADERS,
        status: 201,
      });
    } else if (path.startsWith("/products/") && method === "GET") {
      const id = path.split("/")[2];
      const [rows] = await connection.execute(
        "SELECT * FROM products WHERE id = ?",
        [id]
      );
      return new Response(JSON.stringify(rows[0] || {}), {
        ...CORS_HEADERS,
        status: 200,
      });
    } else if (path.startsWith("/products") && method === "GET") {
      const [rows] = await connection.execute("SELECT * FROM products");
      return new Response(JSON.stringify(rows || []), {
        ...CORS_HEADERS,
        status: 200,
      });
    } else if (path.startsWith("/products/") && method === "PUT") {
      const id = path.split("/")[2];
      const { productId, orderId } = await request.json();
      await connection.execute(
        "UPDATE products SET productId = ?, orderId = ? WHERE id = ?",
        [productId, orderId, id]
      );
      return new Response(null, { ...CORS_HEADERS, status: 204 });
    } else if (path.startsWith("/products/") && method === "DELETE") {
      const id = path.split("/")[2];
      await connection.execute("DELETE FROM products WHERE id = ?", [id]);
      return new Response(null, { ...CORS_HEADERS, status: 204 });
    }

    return new Response("Not Found", { ...CORS_HEADERS, status: 404 });
  },
});

console.log(`Listening on http://localhost:${PORT} ...`);
