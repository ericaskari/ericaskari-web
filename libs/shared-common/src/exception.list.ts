import { HttpException } from './http-exception';
import { AppHttpStatusEnum } from '@ericaskari/shared/enum';
import { ExceptionNameFinder } from './exception.finder';

export class NotFoundErrorException extends HttpException {
    statusCode = AppHttpStatusEnum.NOT_FOUND;
    name = ExceptionNameFinder(this);
}
export class UnauthorizedException extends HttpException {
    statusCode = AppHttpStatusEnum.UNAUTHORIZED;
    name = ExceptionNameFinder(this);
}

export class InternalServerErrorException extends HttpException {
    override statusCode = AppHttpStatusEnum.INTERNAL_SERVER_ERROR;
}
export class FormValidationErrorException extends HttpException {
    override statusCode = AppHttpStatusEnum.BAD_REQUEST;
    override name = ExceptionNameFinder(this);
}
