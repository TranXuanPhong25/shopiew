# Azure Web App
FROM node:18-alpine AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/*/package.json ./packages/*/
COPY apps/*/package.json ./apps/*/

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build packages
RUN pnpm build --filter="./packages/*"

# Multi-stage build for different apps
FROM base AS main-builder
RUN pnpm build --filter="@shopiew/main"

FROM base AS seller-builder  
RUN pnpm build --filter="@shopiew/seller"

FROM base AS admin-builder
RUN pnpm build --filter="@shopiew/admin"

# Main app production image
FROM node:18-alpine AS main
WORKDIR /app
COPY --from=main-builder /app/apps/main/.next ./apps/main/.next
COPY --from=main-builder /app/apps/main/package.json ./apps/main/
COPY --from=main-builder /app/node_modules ./node_modules
COPY --from=main-builder /app/apps/main/public ./apps/main/public
EXPOSE 3000
CMD ["node", "apps/main/server.js"]

# Seller app production image
FROM node:18-alpine AS seller
WORKDIR /app
COPY --from=seller-builder /app/apps/seller/.next ./apps/seller/.next
COPY --from=seller-builder /app/apps/seller/package.json ./apps/seller/
COPY --from=seller-builder /app/node_modules ./node_modules
COPY --from=seller-builder /app/apps/seller/public ./apps/seller/public
EXPOSE 3001
CMD ["node", "apps/seller/server.js"]

# Admin app production image
FROM node:18-alpine AS admin
WORKDIR /app
COPY --from=admin-builder /app/apps/admin/.next ./apps/admin/.next
COPY --from=admin-builder /app/apps/admin/package.json ./apps/admin/
COPY --from=admin-builder /app/node_modules ./node_modules
COPY --from=admin-builder /app/apps/admin/public ./apps/admin/public
EXPOSE 3002
CMD ["node", "apps/admin/server.js"]
