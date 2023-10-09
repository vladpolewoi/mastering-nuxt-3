### Mastering Nuxt 3

1. Install netlify globally
2. `netlify link`
3. `pnpm add -g prisma` Global CLI tool
4. Add env variables

```
SUPABASE_URL=(supabase)
SUPABASE_KEY=(supabase)
DATABASE_URL=(netlify env:get)
NUXT_PUBLIC_STRIPE_KEY=(stripe)
NUXT_SECRET_KEY=(stripe)
NUXT_STRIPE_WEBHOOK_SECRET=(stripe cli)
```
