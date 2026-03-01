import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  type NestInterceptor
} from "@nestjs/common";
import type { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{ method: string; url: string }>();
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`${request.method} ${request.url} ${Date.now() - now}ms`);
      })
    );
  }
}
