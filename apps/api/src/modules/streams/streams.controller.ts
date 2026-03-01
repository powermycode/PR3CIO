import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { StreamEventDto } from "./dto/stream-event.dto";
import { StreamsService } from "./streams.service";

@Controller("streams")
@UseGuards(JwtAuthGuard)
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @Post("events")
  ingest(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: StreamEventDto) {
    return this.streamsService.ingest(currentUser.id, body);
  }
}
