import { IsString } from "class-validator";

export class MergeEnhanceDto {
  @IsString()
  instrumentalKey!: string;

  @IsString()
  vocalKey!: string;
}
