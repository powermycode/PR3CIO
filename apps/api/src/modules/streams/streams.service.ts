import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infra/prisma.service";
import type { StreamEventDto } from "./dto/stream-event.dto";

@Injectable()
export class StreamsService {
  constructor(private readonly prisma: PrismaService) {}

  async ingest(userId: string, dto: StreamEventDto) {
    const playedAt = dto.playedAt ? new Date(dto.playedAt) : new Date();
    const floorMs = 60_000;
    const bucketStart = new Date(Math.floor(playedAt.getTime() / floorMs) * floorMs);
    const bucketEnd = new Date(bucketStart.getTime() + floorMs);

    const duplicate = await this.prisma.streamEvent.findFirst({
      where: {
        trackId: dto.trackId,
        sessionId: dto.sessionId,
        playedAt: {
          gte: bucketStart,
          lt: bucketEnd
        }
      },
      select: { id: true }
    });

    if (duplicate) {
      return {
        accepted: false,
        reason: "duplicate_bucket_event"
      };
    }

    await this.prisma.streamEvent.create({
      data: {
        trackId: dto.trackId,
        userId,
        sessionId: dto.sessionId,
        source: dto.source,
        secondsPlayed: dto.secondsPlayed,
        completionRate: dto.completionRate,
        completed: dto.completed,
        playedAt
      }
    });

    return {
      accepted: true
    };
  }
}
