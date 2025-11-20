FROM node:lts-alpine AS builder

ENV NODE_ENV=production
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the CSS
RUN pnpm run sass:build

# Final production image
FROM node:lts-alpine

# Add OCI labels for better image metadata
LABEL org.opencontainers.image.title="Quetre" \
      org.opencontainers.image.description="A libre front-end for Quora" \
      org.opencontainers.image.source="https://github.com/zyachel/quetre" \
      org.opencontainers.image.licenses="AGPL-3.0-or-later"

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

ENV NODE_ENV=production
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder --chown=nodejs:nodejs /app /app

# Install only production dependencies
RUN corepack enable && pnpm install --frozen-lockfile --prod

# Switch to non-root user
USER nodejs

EXPOSE 3000

CMD ["node", "server.js"]