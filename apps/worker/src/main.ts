import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { WorkerModule } from "./worker.module";
import { logInfo } from "./utils/structured-logger";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule);
  logInfo("PR3CIO worker started");

  const shutdown = async () => {
    await app.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

void bootstrap();
