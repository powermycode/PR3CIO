import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";
import { getEnv } from "../config/app.config";

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly client: Redis;

  constructor() {
    const env = getEnv();
    this.client = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }
}
