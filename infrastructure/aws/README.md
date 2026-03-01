# AWS-Ready Target Mapping

- API: ECS/Fargate service behind ALB
- Worker: ECS/Fargate service with autoscaling on queue depth
- Database: RDS PostgreSQL
- Queue Cache: ElastiCache Redis
- Storage: S3 private buckets + CloudFront signed behavior
