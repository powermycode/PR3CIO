import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../infra/prisma.service";

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: {
    reporterId: string;
    trackId?: string;
    artistId?: string;
    reason: string;
    details?: string;
  }) {
    if (!input.trackId && !input.artistId) {
      throw new BadRequestException("trackId or artistId is required");
    }

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60_000);
    const recentCount = await this.prisma.report.count({
      where: {
        reporterId: input.reporterId,
        createdAt: { gte: thirtyMinutesAgo }
      }
    });

    if (recentCount >= 20) {
      throw new BadRequestException("Report limit exceeded for this time window");
    }

    return this.prisma.report.create({
      data: {
        reporterId: input.reporterId,
        trackId: input.trackId,
        artistId: input.artistId,
        reason: input.reason,
        details: input.details,
        status: "OPEN"
      }
    });
  }
}
