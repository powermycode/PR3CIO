# Railway Deployment Notes

- Deploy `apps/api` and `apps/worker` as separate services.
- Attach managed PostgreSQL and Redis.
- Set service-specific environment variables from root `.env.example`.
- Ensure worker service has FFmpeg installed (handled in Dockerfile).
