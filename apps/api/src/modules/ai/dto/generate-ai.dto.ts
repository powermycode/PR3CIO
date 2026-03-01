import { IsOptional, IsString, MaxLength } from "class-validator";

export class GenerateAiDto {
  @IsString()
  @MaxLength(50)
  mood!: string;

  @IsString()
  @MaxLength(50)
  genre!: string;

  @IsString()
  @MaxLength(120)
  theme!: string;

  @IsOptional()
  @IsString()
  customLyrics?: string;
}
