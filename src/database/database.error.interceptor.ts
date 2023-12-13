import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
  TypeORMError,
} from 'typeorm';

@Catch(TypeORMError)
export class DatabaseExceptionInterceptor implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const code = (exception as any).code;
    let status = HttpStatus.UNPROCESSABLE_ENTITY;
    let message = 'Internal Server error';

    switch (exception.constructor) {
      case QueryFailedError: // this is a TypeOrm error
        message = (exception as QueryFailedError).message;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        message = (exception as EntityNotFoundError).message;
        break;
      case CannotCreateEntityIdMapError: // and another
        message = (exception as CannotCreateEntityIdMapError).message;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      code,
      message,
    });
  }
}
