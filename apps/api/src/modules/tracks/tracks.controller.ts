import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateTrackUploadDto } from "./dto/create-track-upload.dto";
import { PublishTrackDto } from "./dto/publish-track.dto";
import { StreamManifestService } from "./stream-manifest.service";
import { TracksService } from "./tracks.service";

@Controller("tracks")
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly streamManifestService: StreamManifestService
  ) {}

  @Post("upload-url")
  @UseGuards(JwtAuthGuard)
  createUploadUrl(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: CreateTrackUploadDto) {
    return this.tracksService.createTrackUpload(currentUser.id, body);
  }

  @Post(":id/process-hls")
  @UseGuards(JwtAuthGuard)
  processHls(@CurrentUser() currentUser: AuthenticatedUser, @Param("id") id: string) {
    return this.tracksService.queueHlsProcessing(currentUser.id, id);
  }

  @Post(":id/publish")
  @UseGuards(JwtAuthGuard)
  publish(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param("id") id: string,
    @Body() body: PublishTrackDto
  ) {
    return this.tracksService.publish(currentUser.id, id, body);
  }

  @Get(":id/stream-manifest")
  @UseGuards(JwtAuthGuard)
  @Header("Content-Type", "application/vnd.apple.mpegurl")
  streamManifest(@CurrentUser() currentUser: AuthenticatedUser, @Param("id") id: string) {
    return this.streamManifestService.getSignedMasterManifest(currentUser.id, id);
  }

  @Get(":id/variant/:variantName")
  @Header("Content-Type", "application/vnd.apple.mpegurl")
  variantManifest(
    @Param("id") id: string,
    @Param("variantName") variantName: string,
    @Query("token") token: string
  ) {
    return this.streamManifestService.getSignedVariantManifest(id, variantName, token);
  }
}
