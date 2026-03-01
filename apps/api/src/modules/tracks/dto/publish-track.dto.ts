import { IsBoolean } from "class-validator";

export class PublishTrackDto {
  @IsBoolean()
  isOriginal!: boolean;

  @IsBoolean()
  copyrightDeclared!: boolean;

  @IsBoolean()
  termsAccepted!: boolean;
}
