import { BadRequestException, Injectable, type PipeTransform } from "@nestjs/common";
import type { ZodTypeAny } from "zod";

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodTypeAny) {}

  transform(value: T): T {
    const parsed = this.schema.safeParse(value);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    return parsed.data as T;
  }
}
