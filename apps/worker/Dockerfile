FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /workspace

FROM base AS deps
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/worker/package.json apps/worker/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
RUN pnpm install --no-frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm --filter @pr3cio/types build
RUN pnpm --filter @pr3cio/config build
RUN pnpm --filter @pr3cio/worker build

FROM node:20-alpine AS runtime
RUN apk add --no-cache ffmpeg
RUN corepack enable
WORKDIR /workspace
COPY --from=build /workspace/node_modules ./node_modules
COPY --from=build /workspace/apps/worker/dist ./apps/worker/dist
COPY --from=build /workspace/apps/worker/package.json ./apps/worker/package.json
ENV NODE_ENV=production
WORKDIR /workspace/apps/worker
CMD ["node", "dist/main.js"]
