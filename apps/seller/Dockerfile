FROM node:18-alpine AS base
RUN npm install -g pnpm@8.15.0
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ ./packages/
COPY apps/seller/package.json ./apps/seller/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages

# Build shared packages first
RUN pnpm build --filter="./packages/*"

# Build seller app
RUN pnpm build --filter="@shopiew/seller"

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/apps/seller/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/seller/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/seller/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]