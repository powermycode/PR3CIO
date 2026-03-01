import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { AdminService } from "./admin.service";
import { BanArtistDto } from "./dto/ban-artist.dto";
import { ModerateTrackDto } from "./dto/moderate-track.dto";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("dashboard")
  dashboard() {
    return this.adminService.dashboard();
  }

  @Get("reports")
  reports() {
    return this.adminService.listReports();
  }

  @Post("tracks/:id/remove")
  removeTrack(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param("id") id: string,
    @Body() body: ModerateTrackDto
  ) {
    return this.adminService.removeTrack(currentUser.id, id, body.reason);
  }

  @Post("artists/:id/ban")
  banArtist(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param("id") id: string,
    @Body() body: BanArtistDto
  ) {
    return this.adminService.banArtist(currentUser.id, id, body.reason);
  }
}
