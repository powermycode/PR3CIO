# PR3CIO Architecture Overview

- `apps/api`: NestJS API gateway and business services.
- `apps/worker`: BullMQ consumers for AI and media processing.
- `apps/mobile`: Expo RN client for listeners/artists.
- `apps/web`: Next.js marketing + admin console.
- Shared contracts in `packages/types` and typed client in `packages/api-client`.
