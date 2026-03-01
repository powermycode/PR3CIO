import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../infra/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [totalStreams, activeArtists, totalRevenueMicros] = await Promise.all([
      this.prisma.streamEvent.count(),
      this.prisma.user.count({ where: { role: "ARTIST", isBanned: false, deletedAt: null } }),
      this.prisma.streamDailyCounter.aggregate({
        _sum: {
          revenueMicros: true
        }
      })
    ]);

    return {
      totalStreams,
      activeArtists,
      projectedRevenueMicros: Number(totalRevenueMicros._sum.revenueMicros ?? 0)
    };
  }

  listReports() {
    return this.prisma.report.findMany({
      where: { status: "OPEN" },
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }

  async removeTrack(adminId: string, trackId: string, reason: string) {
    const track = await this.prisma.track.findUnique({ where: { id: trackId }, select: { id: true } });
    if (!track) {
      throw new NotFoundException("Track not found");
    }

    await this.prisma.track.update({
      where: { id: trackId },
      data: {
        status: "BLOCKED",
        blockedAt: new Date()
      }
    });

    await this.prisma.adminActionLog.create({
      data: {
        adminId,
        actionType: "REMOVE_TRACK",
        targetType: "TRACK",
        targetId: trackId,
        payloadJson: { reason }
      }
    });

    return { ok: true };
  }

  async banArtist(adminId: string, artistId: string, reason: string) {
    const artist = await this.prisma.user.findUnique({
      where: { id: artistId },
      select: { id: true, role: true }
    });

    if (!artist || artist.role !== "ARTIST") {
      throw new NotFoundException("Artist not found");
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: artistId },
        data: {
          isBanned: true
        }
      }),
      this.prisma.track.updateMany({
        where: {
          artistId,
          status: {
            in: ["READY", "PUBLISHED", "PROCESSING", "DRAFT"]
          }
        },
        data: {
          status: "BLOCKED",
          blockedAt: new Date()
        }
      }),
      this.prisma.adminActionLog.create({
        data: {
          adminId,
          actionType: "BAN_ARTIST",
          targetType: "ARTIST",
          targetId: artistId,
          payloadJson: { reason }
        }
      })
    ]);

    return { ok: true };
  }
}
