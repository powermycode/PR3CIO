import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength
} from "class-validator";

export class OnboardArtistDto {
  @IsString()
  @MaxLength(80)
  stageName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bio?: string;

  @IsOptional()
  @IsString()
  profilePhotoKey?: string;

  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  @IsOptional()
  @IsUrl()
  youtubeUrl?: string;

  @IsOptional()
  @IsUrl()
  tiktokUrl?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  genres!: string[];
}
