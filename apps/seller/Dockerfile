FROM node:22-alpine AS base
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
# Replace <your-major-version> with the major version installed in your repository. For example:
# RUN pnpm global add turbo@^2
RUN corepack enable pnpm 
# RUN pnpm  add -g turbo@^2 
COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "seller" is the name entered in the project's package.json: { name: "seller" }
RUN pnpm dlx turbo prune @shopiew/seller --docker 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN corepack enable pnpm
RUN pnpm install --frozen-lockfile
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/seller/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/seller/.next/static ./apps/seller/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/seller/public ./apps/seller/public
 
CMD ["node", "apps/seller/server.js"]
