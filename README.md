# PR3CIO

Production-ready Phase 1 monorepo for an AI-powered original music platform.

## Stack
- Monorepo: `pnpm` + `turborepo`
- API: NestJS + Prisma + PostgreSQL + Supabase JWT verification
- Worker: NestJS application context + BullMQ + Redis
- Storage: AWS S3 private buckets
- Streaming: FFmpeg HLS ladder (64/128/256 kbps)
- Mobile: Expo Router (iOS + Android)
- Web: Next.js 14 App Router (marketing + admin)

## Monorepo Layout
- `apps/api` - REST API, auth, tracks, AI project management, social, moderation
- `apps/worker` - async processors (`ai.generate`, `ai.mergeEnhance`, `tracks.processHls`, daily analytics)
- `apps/mobile` - mobile app with role auth, tabs, AI studio flow
- `apps/web` - marketing pages and admin dashboard/moderation
- `packages/types` - shared domain and queue contracts
- `packages/api-client` - typed API client
- `packages/ui` - shared lightweight React UI primitives
- `packages/config` - env parsing + structured logging helpers

## Local Prerequisites
- Node 20+
- pnpm 9+
- Docker (for local Postgres/Redis/MinIO)
- FFmpeg installed locally for worker development

## Environment Setup
1. Copy root `.env.example` values into real environment variables (or `.env` for local shell usage).
2. Copy app-level templates:
   - `apps/api/.env.example`
   - `apps/worker/.env.example`
   - `apps/mobile/.env.example`
   - `apps/web/.env.example`
3. Configure Supabase JWT issuer/audience/JWKS values.
4. Configure S3 credentials and bucket names.

## Boot Local Infrastructure
```bash
cd infrastructure/docker
docker compose up -d
```

## Install Dependencies
```bash
pnpm install
```

## Prisma Generate + Migrate
```bash
pnpm --filter @pr3cio/api prisma:generate
pnpm --filter @pr3cio/api prisma:migrate
```

## Run Apps
```bash
pnpm --filter @pr3cio/api dev
pnpm --filter @pr3cio/worker dev
pnpm --filter @pr3cio/web dev
pnpm --filter @pr3cio/mobile dev
```

Or run all in parallel:
```bash
pnpm dev
```

## Core API Routes (Phase 1)
- `POST /auth/session`
- `POST /artists/onboarding`
- `PATCH /artists/me`
- `GET /artists/:artistId`
- `POST /ai/generate`
- `GET /ai/projects/:id`
- `POST /ai/projects/:id/upload-vocal-url`
- `POST /ai/projects/:id/merge-enhance`
- `POST /tracks/upload-url`
- `POST /tracks/:id/process-hls`
- `POST /tracks/:id/publish`
- `GET /tracks/:id/stream-manifest`
- `GET /tracks/:id/variant/:variantName`
- `POST /streams/events`
- `POST /follows/:artistId`
- `POST /tracks/:trackId/like`
- `POST /tracks/:trackId/comments`
- `GET /tracks/:trackId/comments`
- `GET /feed/home`
- `POST /reports`
- `GET /admin/dashboard`
- `GET /admin/reports`
- `POST /admin/tracks/:id/remove`
- `POST /admin/artists/:id/ban`

## Queue Jobs
- `ai.generate`
- `ai.mergeEnhance`
- `tracks.processHls`
- `analytics.aggregateDaily`

## Compliance Rules Enforced
- Publish requires `isOriginal=true`
- Publish requires `copyrightDeclared=true`
- Publish requires `termsAccepted=true`
- Artist profile onboarding must be completed before publish
- Admin moderation supports track removal and artist banning with audit log entries

## CI/CD
- GitHub Actions workflow: `.github/workflows/ci.yml`
- Runs install, lint, typecheck, test, build across workspace

## Deployment
### Railway (current target)
- Deploy `apps/api` and `apps/worker` as separate services.
- Use `apps/api/railway.toml` and `apps/worker/railway.toml`.
- Provision managed PostgreSQL + Redis.

### Docker
- API image: `apps/api/Dockerfile`
- Worker image: `apps/worker/Dockerfile`

### Mobile EAS
- Config: `apps/mobile/eas.json`
- iOS compliance baseline includes Apple Sign In and privacy/terms pages.

## Store Compliance Checklist (Phase 1)
- Apple Sign In included for iOS build
- Privacy policy page available at `/privacy`
- Terms page available at `/terms`
- Copyright declaration required during publish flow
- Reporting workflow and admin moderation controls implemented

## Notes
- Stripe Connect is schema-ready (`stripeAccountId`, payout eligibility flags, `PayoutLedger`), but live transfers remain disabled.
- HLS segment/object access is private and signed.
