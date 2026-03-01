import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  getMe(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.usersService.getMe(currentUser.id);
  }

  @Patch("me")
  updateMe(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: UpdateUserDto) {
    return this.usersService.updateMe(currentUser.id, body);
  }
}
