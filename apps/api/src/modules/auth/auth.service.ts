import { Injectable } from "@nestjs/common";
import type { UserRole } from "@pr3cio/types";
import { PrismaService } from "../../infra/prisma.service";
import type { SessionDto } from "./dto/session.dto";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdateSession(dto: SessionDto) {
    const user = await this.prisma.user.upsert({
      where: {
        supabaseUserId: dto.supabaseUserId
      },
      update: {
        email: dto.email,
        role: dto.role as UserRole,
        displayName: dto.displayName ?? dto.email.split("@")[0] ?? "User"
      },
      create: {
        id: dto.supabaseUserId,
        supabaseUserId: dto.supabaseUserId,
        email: dto.email,
        role: dto.role as UserRole,
        displayName: dto.displayName ?? dto.email.split("@")[0] ?? "User"
      }
    });

    return {
      id: user.id,
      supabaseUserId: user.supabaseUserId,
      email: user.email,
      role: user.role,
      displayName: user.displayName
    };
  }
}
