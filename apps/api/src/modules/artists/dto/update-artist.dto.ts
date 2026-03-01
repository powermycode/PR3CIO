import { IsArray, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  stageName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bio?: string;

  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  @IsOptional()
  @IsUrl()
  youtubeUrl?: string;

  @IsOptional()
  @IsUrl()
  tiktokUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];
}
