import { defineConfig } from "prisma/config";

// DATABASE_URL is read at run time only: `prisma generate` (the build) does
// not need it, `prisma migrate deploy` (the release step) does.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
