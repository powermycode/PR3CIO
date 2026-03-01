import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../infra/prisma.service";
import type { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        displayName: true,
        avatarKey: true,
        isBanned: true
      }
    });
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!existing) {
      throw new NotFoundException("User not found");
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        displayName: dto.displayName,
        avatarKey: dto.avatarKey
      },
      select: {
        id: true,
        email: true,
        role: true,
        displayName: true,
        avatarKey: true
      }
    });
  }
}
