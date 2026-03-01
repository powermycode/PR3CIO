import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { IsString, MaxLength } from "class-validator";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { SocialService } from "./social.service";

class CommentBodyDto {
  @IsString()
  @MaxLength(1000)
  body!: string;
}

@Controller()
@UseGuards(JwtAuthGuard)
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post("follows/:artistId")
  toggleFollow(@CurrentUser() currentUser: AuthenticatedUser, @Param("artistId") artistId: string) {
    return this.socialService.toggleFollow(currentUser.id, artistId);
  }

  @Post("tracks/:trackId/like")
  toggleLike(@CurrentUser() currentUser: AuthenticatedUser, @Param("trackId") trackId: string) {
    return this.socialService.toggleLike(currentUser.id, trackId);
  }

  @Post("tracks/:trackId/comments")
  addComment(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param("trackId") trackId: string,
    @Body() body: CommentBodyDto
  ) {
    return this.socialService.addComment(currentUser.id, trackId, body.body);
  }

  @Get("tracks/:trackId/comments")
  getComments(@Param("trackId") trackId: string) {
    return this.socialService.getComments(trackId);
  }

  @Get("feed/home")
  homeFeed(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.socialService.homeFeed(currentUser.id);
  }
}
