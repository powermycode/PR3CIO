# Operational Runbook

## Queue Backlog
- Verify Redis health.
- Check worker logs for repeated failures.
- Requeue dead jobs after root cause fix.

## Streaming Incident
- Validate S3 object keys for target track.
- Verify signed manifest endpoint and token TTL configuration.
- Confirm track status is `PUBLISHED` and not `BLOCKED`.
