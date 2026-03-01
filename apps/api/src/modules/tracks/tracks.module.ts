import { Module } from "@nestjs/common";
import { TracksController } from "./tracks.controller";
import { TracksService } from "./tracks.service";
import { StreamManifestService } from "./stream-manifest.service";

@Module({
  controllers: [TracksController],
  providers: [TracksService, StreamManifestService],
  exports: [TracksService]
})
export class TracksModule {}
