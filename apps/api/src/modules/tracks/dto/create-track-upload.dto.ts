import { IsMimeType, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTrackUploadDto {
  @IsString()
  @MaxLength(120)
  title!: string;

  @IsString()
  @MaxLength(50)
  genre!: string;

  @IsMimeType()
  contentType!: string;

  @IsOptional()
  @IsString()
  sourceKey?: string;
}
