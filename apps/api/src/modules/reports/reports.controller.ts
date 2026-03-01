import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { ReportsService } from "./reports.service";

class CreateReportDto {
  @IsOptional()
  @IsString()
  trackId?: string;

  @IsOptional()
  @IsString()
  artistId?: string;

  @IsString()
  @MaxLength(120)
  reason!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  details?: string;
}

@Controller("reports")
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: CreateReportDto) {
    return this.reportsService.create({
      reporterId: currentUser.id,
      reason: body.reason,
      ...(body.trackId ? { trackId: body.trackId } : {}),
      ...(body.artistId ? { artistId: body.artistId } : {}),
      ...(body.details ? { details: body.details } : {})
    });
  }
}
