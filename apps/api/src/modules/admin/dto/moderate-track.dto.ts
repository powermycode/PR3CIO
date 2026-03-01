import { IsString, MaxLength } from "class-validator";

export class ModerateTrackDto {
  @IsString()
  @MaxLength(300)
  reason!: string;
}
