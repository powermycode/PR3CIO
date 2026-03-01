import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { ArtistsService } from "./artists.service";
import { OnboardArtistDto } from "./dto/onboard-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@Controller("artists")
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post("onboarding")
  @UseGuards(JwtAuthGuard)
  onboard(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: OnboardArtistDto) {
    return this.artistsService.onboard(currentUser.id, body);
  }

  @Patch("me")
  @UseGuards(JwtAuthGuard)
  update(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: UpdateArtistDto) {
    return this.artistsService.update(currentUser.id, body);
  }

  @Get(":artistId")
  getArtist(@Param("artistId") artistId: string) {
    return this.artistsService.getArtist(artistId);
  }
}
