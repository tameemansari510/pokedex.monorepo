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

RUN yarn build

RUN yarn workspace @monorepo/components build-storybook

# -------------------------------
# Stage 2: Runner
# -------------------------------
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /monorepo/apps/pokedex/package.json ./
COPY --from=builder /monorepo/apps/pokedex/.next ./.next
COPY --from=builder /monorepo/apps/pokedex/next.config.cjs ./
COPY --from=builder /monorepo/node_modules ./node_modules
COPY --from=builder /monorepo/packages/components/storybook-static ./storybook-static

RUN yarn global add serve
RUN yarn global add concurrently

ENV NODE_ENV=production
EXPOSE 3000
EXPOSE 6006

CMD concurrently "yarn start" "serve ./storybook-static -l 6006"
