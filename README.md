## init prisma and postgres

### run postgres on localhost

### use pgAdmin or prisma studio

```bash
npx create-next-app@latest —typescript

git remote add origin https://github.com/hnakae/SaaS.git

git branch -M main

git push -u origin main

pnpm i -D prisma

pnpm i @prisma/client

npx prisma init
```

### set database_url in .env

### create prisma schema, check docs

```bash
npx prisma migrate dev --name init
```

### edit build script to: "prisma generate && next build"

```bash
pnpm i -D ts-node
```

### add to package.json "prisma": {

    "seed": “ts-node —compiler-options {\”module\”:\”CommonJS\”} prisma/seed.ts"

}

### create prisma/seed.ts, check docs

### run npx prisma generate after changing schema

```bash
npx prisma db seed
```

### create src/lib/prisma.ts get globalForPrisma from docs

## hey cool

```bash
pnpm dev
```

# Let's add NextAuth.js

```bash
pnpm add next-auth
```

### create /app/api/auth/[...nextauth]/route.ts

### set up .env.local var for next auth: secret to encrypt jwt

```bash
openssl rand -hex 32
```

## next steps

### get session data

providers.tsx
user.tsx

### connect with prisma

### bcrypt is for encrypting and comparing passwords.

```bash
pnpm add bcrypt
pnpm add -D @types/bcrypt
```

### authorize function with prisma

### update session JWT with new data

### protected routes with middleware
