import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { envSchema } from "./config/env.schema";
import { PrismaModule } from "./infra/prisma.module";
import { RedisModule } from "./infra/redis.module";
import { QueueModule } from "./infra/queue.module";
import { S3Module } from "./infra/s3.module";
import { HealthModule } from "./modules/health/health.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ArtistsModule } from "./modules/artists/artists.module";
import { AiModule } from "./modules/ai/ai.module";
import { TracksModule } from "./modules/tracks/tracks.module";
import { SocialModule } from "./modules/social/social.module";
import { StreamsModule } from "./modules/streams/streams.module";
import { ReportsModule } from "./modules/reports/reports.module";
import { AdminModule } from "./modules/admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => envSchema.parse(config)
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 120
      }
    ]),
    PrismaModule,
    RedisModule,
    QueueModule,
    S3Module,
    HealthModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    AiModule,
    TracksModule,
    SocialModule,
    StreamsModule,
    ReportsModule,
    AdminModule
  ]
})
export class AppModule {}
