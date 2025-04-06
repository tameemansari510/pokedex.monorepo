# -------------------------------
# Stage 1: Builder
# -------------------------------
FROM node:18-alpine AS builder

RUN npm install -g lerna

WORKDIR /monorepo

COPY package.json yarn.lock lerna.json ./
COPY .npmrc .npmrc
COPY packages/components/package.json packages/components/
COPY packages/utils/package.json packages/utils/
COPY apps/pokedex/package.json apps/pokedex/

RUN yarn install --frozen-lockfile --network-timeout 1000000

COPY . .

# ✅ Use only yarn build (uses the root script)
RUN yarn build

# -------------------------------
# Stage 2: Runner
# -------------------------------
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /monorepo/apps/pokedex/package.json ./
# COPY --from=builder /monorepo/apps/pokedex/public ./public
COPY --from=builder /monorepo/apps/pokedex/.next ./.next
COPY --from=builder /monorepo/apps/pokedex/next.config.cjs ./

# COPY --from=builder /monorepo/packages/utils/dist ./node_modules/@monorepo/utils
# COPY --from=builder /monorepo/packages/components/dist ./node_modules/@monorepo/components

# RUN yarn install --production --frozen-lockfile
COPY --from=builder /monorepo/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["yarn", "start"]
