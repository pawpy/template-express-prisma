# Express and Prisma starter

An [Express](https://expressjs.com) API in TypeScript using [Prisma](https://www.prisma.io) on PostgreSQL. Each request to `/` records a visit and returns the count, which proves the database works.

## Run it locally

```sh
npm install
export DATABASE_URL=postgresql://user:password@localhost:5432/app
npm run migrate    # apply prisma/migrations
npm run build
npm start
```

Then open http://localhost:8080. `GET /health` answers `ok` for health checks.

## Deploying

| Step | Command |
| --- | --- |
| Build | npm run build  (prisma generate && tsc; needs no database) |
| Before each release | npm run migrate  (prisma migrate deploy) |
| Start | npm start |

Database migrations run as a separate step before the new version starts, never during the build: a build has no database to talk to.

## Environment variables

| Variable | Meaning |
| --- | --- |
| `PORT` | Port to listen on. Default: 8080. |
| `DATABASE_URL` | PostgreSQL connection string, e.g. `postgresql://user:password@host:5432/db`. Required. |

## Notes

To change the schema, edit `prisma/schema.prisma` and run `npx prisma migrate dev --name <change>` against a development database, then commit the new folder in `prisma/migrations`.

## License

MIT
