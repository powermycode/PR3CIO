import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { CurrentUser, type AuthenticatedUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AiService } from "./ai.service";
import { GenerateAiDto } from "./dto/generate-ai.dto";
import { MergeEnhanceDto } from "./dto/merge-enhance.dto";

@Controller("ai")
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("generate")
  async generate(@CurrentUser() currentUser: AuthenticatedUser, @Body() body: GenerateAiDto) {
    const response = await this.aiService.generate(currentUser.id, body);
    await this.aiService.testProvider(response.projectId, currentUser.id, body);
    return response;
  }

  @Get("projects/:id")
  getProject(@CurrentUser() currentUser: AuthenticatedUser, @Param("id") id: string) {
    return this.aiService.getProject(currentUser.id, id);
  }

  @Post("projects/:id/upload-vocal-url")
  createVocalUploadUrl(@CurrentUser() currentUser: AuthenticatedUser, @Param("id") id: string) {
    return this.aiService.createVocalUploadUrl(currentUser.id, id);
  }

  @Post("projects/:id/merge-enhance")
  mergeEnhance(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param("id") id: string,
    @Body() body: MergeEnhanceDto
  ) {
    return this.aiService.mergeEnhance(currentUser.id, id, body);
  }
}
