import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../infra/prisma.service";

@Injectable()
export class AiProjectStateService {
  constructor(private readonly prisma: PrismaService) {}

  setGenerating(projectId: string) {
    return this.prisma.aIProject.update({
      where: { id: projectId },
      data: {
        status: "GENERATING",
        attemptCount: {
          increment: 1
        }
      }
    });
  }

  setGenerated(projectId: string, payload: { lyrics: string; instrumentalKey: string; metadata: Prisma.JsonObject }) {
    return this.prisma.aIProject.update({
      where: { id: projectId },
      data: {
        status: "GENERATED",
        generatedLyrics: payload.lyrics,
        instrumentalKey: payload.instrumentalKey,
        metadataJson: payload.metadata,
        errorMessage: null
      }
    });
  }

  setCompleted(projectId: string, finalMasterKey: string) {
    return this.prisma.aIProject.update({
      where: { id: projectId },
      data: {
        status: "COMPLETED",
        finalMasterKey,
        errorMessage: null
      }
    });
  }

  setFailed(projectId: string, message: string) {
    return this.prisma.aIProject.update({
      where: { id: projectId },
      data: {
        status: "FAILED",
        errorMessage: message
      }
    });
  }
}
