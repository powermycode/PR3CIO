import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { getEnv } from "../../config/app.config";
import { QueueService } from "../../infra/queue.service";
import { PrismaService } from "../../infra/prisma.service";
import { S3Service } from "../../infra/s3.service";
import { SUNO_PROVIDER, type SunoProvider } from "./suno.provider";
import type { GenerateAiDto } from "./dto/generate-ai.dto";
import type { MergeEnhanceDto } from "./dto/merge-enhance.dto";

@Injectable()
export class AiService {
  private readonly env = getEnv();

  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
    private readonly s3Service: S3Service,
    @Inject(SUNO_PROVIDER) private readonly sunoProvider: SunoProvider
  ) {}

  async generate(userId: string, dto: GenerateAiDto) {
    const project = await this.prisma.aIProject.create({
      data: {
        artistId: userId,
        mood: dto.mood,
        genre: dto.genre,
        theme: dto.theme,
        customLyrics: dto.customLyrics,
        status: "QUEUED"
      }
    });

    await this.queueService.enqueueAIGenerate({
      projectId: project.id,
      artistId: userId,
      mood: dto.mood,
      genre: dto.genre,
      theme: dto.theme,
      ...(dto.customLyrics ? { customLyrics: dto.customLyrics } : {})
    });

    return {
      projectId: project.id,
      status: project.status
    };
  }

  async getProject(userId: string, projectId: string) {
    const project = await this.prisma.aIProject.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      throw new NotFoundException("AI project not found");
    }

    if (project.artistId !== userId) {
      throw new ForbiddenException("AI project access denied");
    }

    return project;
  }

  async createVocalUploadUrl(userId: string, projectId: string) {
    const project = await this.getProject(userId, projectId);
    const key = `ai-projects/${project.id}/vocal.wav`;

    const uploadUrl = await this.s3Service.getUploadUrl({
      bucket: this.env.S3_BUCKET_AUDIO,
      key,
      contentType: "audio/wav"
    });

    await this.prisma.aIProject.update({
      where: { id: project.id },
      data: { vocalKey: key }
    });

    return { key, uploadUrl };
  }

  async mergeEnhance(userId: string, projectId: string, dto: MergeEnhanceDto) {
    const project = await this.getProject(userId, projectId);

    await this.prisma.aIProject.update({
      where: { id: project.id },
      data: {
        status: "MERGING",
        instrumentalKey: dto.instrumentalKey,
        vocalKey: dto.vocalKey,
        attemptCount: {
          increment: 1
        }
      }
    });

    await this.queueService.enqueueAIMergeEnhance({
      projectId: project.id,
      artistId: userId,
      instrumentalKey: dto.instrumentalKey,
      vocalKey: dto.vocalKey
    });

    return { projectId: project.id, status: "MERGING" };
  }

  async testProvider(projectId: string, userId: string, dto: GenerateAiDto) {
    if (this.env.NODE_ENV !== "development") {
      return;
    }

    const result = await this.sunoProvider.generate({
      mood: dto.mood,
      genre: dto.genre,
      theme: dto.theme,
      ...(dto.customLyrics ? { customLyrics: dto.customLyrics } : {}),
      artistId: userId,
      projectId
    });

    await this.prisma.aIProject.update({
      where: { id: projectId },
      data: {
        generatedLyrics: result.lyrics,
        metadataJson: result.metadata as any,
        status: "GENERATED"
      }
    });
  }
}
