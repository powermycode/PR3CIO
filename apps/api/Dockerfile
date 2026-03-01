FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /workspace

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
RUN pnpm install --no-frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm --filter @pr3cio/types build
RUN pnpm --filter @pr3cio/config build
RUN pnpm --filter @pr3cio/api prisma:generate
RUN pnpm --filter @pr3cio/api build

FROM node:20-alpine AS runtime
RUN corepack enable
WORKDIR /workspace
COPY --from=build /workspace/node_modules ./node_modules
COPY --from=build /workspace/apps/api/dist ./apps/api/dist
COPY --from=build /workspace/apps/api/prisma ./apps/api/prisma
COPY --from=build /workspace/apps/api/package.json ./apps/api/package.json
ENV NODE_ENV=production
WORKDIR /workspace/apps/api
CMD ["node", "dist/main.js"]
