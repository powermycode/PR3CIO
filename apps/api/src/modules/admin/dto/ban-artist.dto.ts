import { IsString, MaxLength } from "class-validator";

export class BanArtistDto {
  @IsString()
  @MaxLength(300)
  reason!: string;
}
