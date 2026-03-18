import pool from './db.js';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const initSql = `
  CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    origin VARCHAR(100)
  );

  CREATE TABLE IF NOT EXISTS coffee_products (
    id SERIAL PRIMARY KEY,
    coffee_name VARCHAR(100) NOT NULL,
    origin VARCHAR(100)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    product_id INT REFERENCES coffee_products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export const initializeDatabase = async (retries = 5) => {
  while (retries > 0) {
    try {
      // 1. Try a simple "Select 1" to check if the connection is alive
      await pool.query('SELECT 1');
      
      // 2. If successful, run the table creation
      await pool.query(initSql);
      console.log("Database is ready and tables are verified.");
      return; // Exit the function successfully
      
    } catch (err) {
      retries--;
      console.log(`Database not ready. Retrying... (${retries} attempts left)`, err);
      
      if (retries === 0) {
        console.error("Could not connect to the database after multiple attempts.", err);
        process.exit(1);
      }
      await sleep(3000);
    }
  }
};