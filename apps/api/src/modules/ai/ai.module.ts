import { Module } from "@nestjs/common";
import { getEnv } from "../../config/app.config";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { SUNO_PROVIDER } from "./suno.provider";
import { MockSunoProvider } from "./providers/mock-suno.provider";
import { RealSunoProvider } from "./providers/real-suno.provider";

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    MockSunoProvider,
    RealSunoProvider,
    {
      provide: SUNO_PROVIDER,
      useFactory: (mockProvider: MockSunoProvider, realProvider: RealSunoProvider) => {
        const env = getEnv();
        return env.SUNO_MODE === "real" ? realProvider : mockProvider;
      },
      inject: [MockSunoProvider, RealSunoProvider]
    }
  ],
  exports: [AiService]
})
export class AiModule {}
