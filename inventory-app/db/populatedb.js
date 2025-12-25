const { Client } = require("pg");

const SQL = `
ALTER TABLE items ADD COLUMN IF NOT EXISTS category VARCHAR(100);

TRUNCATE items RESTART IDENTITY;

INSERT INTO items (name, quantity, price, category)
VALUES
  -- Electronics
  ('Mechanical Keyboard', 15, 89.99, 'Electronics'),
  ('Gaming Mouse', 42, 45.50, 'Electronics'),
  ('27-inch Monitor', 10, 249.99, 'Electronics'),
  ('USB-C Hub', 25, 35.00, 'Electronics'),
  
  -- Furniture
  ('Standing Desk', 5, 499.99, 'Furniture'),
  ('Ergonomic Chair', 8, 299.00, 'Furniture'),
  ('Desk Lamp', 30, 25.99, 'Furniture'),
  
  -- Stationery
  ('Spiral Notebook', 100, 4.50, 'Stationery'),
  ('Gel Pens (12 pack)', 50, 12.99, 'Stationery'),
  ('Desk Organizer', 20, 15.00, 'Stationery');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Done! Database populated with categorized items.");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await client.end();
  }
}

main();