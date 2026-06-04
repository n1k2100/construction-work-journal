import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: process.env['DATABASE_URL'],
  },
  migrations: {
    path: 'prisma/migrations',
  },
  schema: './node_modules/@construction-work-journal/prisma/schema.prisma',
})
