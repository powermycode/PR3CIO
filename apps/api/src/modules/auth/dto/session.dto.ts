import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import type { UserRole } from "@pr3cio/types";

export class SessionDto {
  @IsString()
  @MinLength(3)
  supabaseUserId!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsIn(["LISTENER", "ARTIST", "ADMIN"])
  role!: UserRole;
}
