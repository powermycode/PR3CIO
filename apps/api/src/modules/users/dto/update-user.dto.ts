import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarKey?: string;
}
