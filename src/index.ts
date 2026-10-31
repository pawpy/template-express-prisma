import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });
const app = express();
const port = Number(process.env.PORT ?? 8080);

// Each request to / records a visit, which proves the database works.
app.get("/", async (_req, res, next) => {
  try {
    await prisma.visit.create({ data: {} });
    const visits = await prisma.visit.count();
    res.json({ message: "Hello from Express and Prisma!", visits });
  } catch (err) {
    next(err);
  }
});

app.get("/health", (_req, res) => {
  res.type("text").send("ok\n");
});

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    prisma.$disconnect().finally(() => process.exit(0));
  });
});
