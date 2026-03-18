import express, { type Request, type Response } from 'express';
import pool from './db.js';
import type { Customer, OrderHistory } from './types.js';

import { initializeDatabase } from './initDb.js';

const app = express();
const PORT = 3000;

app.use(express.json());

//initialize database;  
await initializeDatabase();

// 1. Get All Customers (Type-Safe)
app.get('/customers', async (req: Request, res: Response) => {
  try {
    // We tell TS that the rows returned will match the Customer interface
    const result = await pool.query<Customer>('SELECT * FROM customers ORDER BY id ASC');
    console.log('Fetched Customers:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 2. Get Order History using our JOIN
app.get('/orders-history', async (req: Request, res: Response) => {
  try {
    const queryText = `
      SELECT 
        c.first_name, 
        c.last_name, 
        p.coffee_name, 
        p.origin AS bean_origin
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      JOIN coffee_products p ON o.product_id = p.id;
    `;
    const result = await pool.query<OrderHistory>(queryText);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 TypeScript Server running on http://localhost:${PORT}`);
});