import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infra/prisma.service";

@Injectable()
export class SocialService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleFollow(followerId: string, artistId: string) {
    const existing = await this.prisma.follow.findUnique({
      where: { followerId_artistId: { followerId, artistId } }
    });

    if (existing) {
      await this.prisma.follow.delete({
        where: { followerId_artistId: { followerId, artistId } }
      });
      return { following: false };
    }

    await this.prisma.follow.create({
      data: { followerId, artistId }
    });
    return { following: true };
  }

  async toggleLike(userId: string, trackId: string) {
    const existing = await this.prisma.like.findUnique({
      where: { userId_trackId: { userId, trackId } }
    });

    if (existing) {
      await this.prisma.like.delete({ where: { userId_trackId: { userId, trackId } } });
      return { liked: false };
    }

    await this.prisma.like.create({ data: { userId, trackId } });
    return { liked: true };
  }

  async addComment(userId: string, trackId: string, body: string) {
    return this.prisma.comment.create({
      data: {
        userId,
        trackId,
        body
      }
    });
  }

  getComments(trackId: string) {
    return this.prisma.comment.findMany({
      where: {
        trackId,
        deletedAt: null,
        isHidden: false
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 100
    });
  }

  async homeFeed(userId: string) {
    const [trending, newReleases, followingArtists] = await Promise.all([
      this.prisma.track.findMany({
        where: { status: "PUBLISHED", blockedAt: null, deletedAt: null },
        orderBy: { publishedAt: "desc" },
        take: 20
      }),
      this.prisma.track.findMany({
        where: { status: "PUBLISHED", blockedAt: null, deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 20
      }),
      this.prisma.follow.findMany({
        where: { followerId: userId },
        select: { artistId: true }
      })
    ]);

    const recommended = followingArtists.length
      ? await this.prisma.track.findMany({
          where: {
            artistId: {
              in: followingArtists.map((entry: { artistId: string }) => entry.artistId)
            },
            status: "PUBLISHED",
            blockedAt: null,
            deletedAt: null
          },
          orderBy: { publishedAt: "desc" },
          take: 20
        })
      : [];

    return {
      trending,
      newReleases,
      recommended
    };
  }
}
