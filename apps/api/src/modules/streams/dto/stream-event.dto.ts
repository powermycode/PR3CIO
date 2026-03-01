import { IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import type { StreamSource } from "@pr3cio/types";

export class StreamEventDto {
  @IsString()
  trackId!: string;

  @IsString()
  sessionId!: string;

  @IsIn(["MOBILE_IOS", "MOBILE_ANDROID", "WEB"])
  source!: StreamSource;

  @IsInt()
  @Min(0)
  secondsPlayed!: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  completionRate!: number;

  @IsBoolean()
  completed!: boolean;

  @IsOptional()
  @IsString()
  playedAt?: string;
}
