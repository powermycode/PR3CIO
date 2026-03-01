import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{ status: (code: number) => { json: (body: unknown) => void } }>();

    if (exception instanceof HttpException) {
      const httpException = exception as HttpException;
      response.status(httpException.getStatus()).json({
        error: httpException.name,
        message: httpException.message
      });
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: "InternalServerError",
      message: "Unexpected error"
    });
  }
}
