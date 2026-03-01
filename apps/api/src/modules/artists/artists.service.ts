import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { PrismaService } from "../../infra/prisma.service";
import type { OnboardArtistDto } from "./dto/onboard-artist.dto";
import type { UpdateArtistDto } from "./dto/update-artist.dto";

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async onboard(userId: string, dto: OnboardArtistDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.role !== "ARTIST" && user.role !== "ADMIN") {
      throw new ForbiddenException("Only artist accounts can onboard");
    }

    return this.prisma.artistProfile.upsert({
      where: { userId },
      update: {
        stageName: dto.stageName,
        bio: dto.bio,
        instagramUrl: dto.instagramUrl,
        youtubeUrl: dto.youtubeUrl,
        tiktokUrl: dto.tiktokUrl,
        genres: dto.genres,
        onboardingCompleted: true
      },
      create: {
        userId,
        stageName: dto.stageName,
        bio: dto.bio,
        instagramUrl: dto.instagramUrl,
        youtubeUrl: dto.youtubeUrl,
        tiktokUrl: dto.tiktokUrl,
        genres: dto.genres,
        onboardingCompleted: true
      }
    });
  }

  async update(userId: string, dto: UpdateArtistDto) {
    const profile = await this.prisma.artistProfile.findUnique({ where: { userId }, select: { id: true } });
    if (!profile) {
      throw new NotFoundException("Artist profile not found");
    }

    return this.prisma.artistProfile.update({
      where: { userId },
      data: dto
    });
  }

  async getArtist(artistId: string) {
    const artist = await this.prisma.user.findUnique({
      where: { id: artistId },
      select: {
        id: true,
        displayName: true,
        avatarKey: true,
        artistProfile: {
          select: {
            stageName: true,
            bio: true,
            instagramUrl: true,
            youtubeUrl: true,
            tiktokUrl: true,
            genres: true,
            ogVerifiedAt: true,
            streamCount: true,
            monthlyListeners: true
          }
        }
      }
    });

    if (!artist?.artistProfile) {
      throw new NotFoundException("Artist not found");
    }

    return artist;
  }
}
