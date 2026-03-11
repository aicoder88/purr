import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
    schema: 'prisma/schema.prisma',
    datasource: {
        // `prisma generate` loads this config even when no database access is needed.
        url: process.env.DATABASE_URL ?? '',
    },
});
