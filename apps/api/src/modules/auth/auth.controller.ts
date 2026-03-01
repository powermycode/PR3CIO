import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { AuthService } from "./auth.service";
import { SessionDto } from "./dto/session.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("session")
  @UseGuards(JwtAuthGuard)
  createSession(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: SessionDto) {
    return this.authService.createOrUpdateSession({
      ...body,
      supabaseUserId: currentUser.supabaseUserId,
      email: currentUser.email || body.email
    });
  }
}
