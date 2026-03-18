import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'nassim',
  host: process.env.DB_HOST || 'localhost',
  database: 'coffee_shop',
  password: process.env.DB_PASSWORD || 'nassimpassword',
  port: parseInt(process.env.DB_PORT || '5430'),
});

export default pool;