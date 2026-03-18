import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import express, { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';


const app = express();
const PORT = 3000;

app.use(express.json());
const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"] || "postgresql://nassim:nassimpassword@localhost:5430/coffee_shop",
});
const prisma = new PrismaClient({ adapter });

// 1. Get All Customers (Type-Safe)
app.get('/customers', async (req: Request, res: Response) => {
  try {
    const result = await prisma.customer.findMany();
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