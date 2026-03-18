import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import express, { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';
import redisClient, { connectRedis } from './cache.js';


const app = express();
const PORT = 3000;

app.use(express.json());
const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"] || "postgresql://nassim:nassimpassword@localhost:5430/coffee_shop",
});
const prisma = new PrismaClient({ adapter });
await connectRedis();

// 1. Get All Customers (Type-Safe)
app.get('/customers', async (req: Request, res: Response) => {
    const cacheKey = 'all_customers';

  try {
        // 1. Try to get data from Cache
    const cachedData = await redisClient.get(cacheKey);
    
    if (cachedData) {
      console.log("🚀 Serving from Cache!");
      return res.json(JSON.parse(cachedData));
    }
    
    const result = await prisma.customer.findMany();
    // 3. Save to Cache for 60 seconds
    await redisClient.set(cacheKey, JSON.stringify(result), {
      EX: 60 
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 2. Get Order History using our JOIN
app.get('/orders-history', async (req: Request, res: Response) => {
  try {
    const result = await prisma.customer.findMany({
    select: {
        firstName: true,
        lastName: true,
        orders: {
        select: {
            product: {
            select: {
                coffeeName: true,
                origin: true,
            },
            },
        },
        },
    },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 TypeScript Server running on http://localhost:${PORT}`);
});