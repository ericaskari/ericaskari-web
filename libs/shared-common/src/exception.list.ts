import { HttpException } from './http-exception';
import { AppHttpStatusEnum } from '@ericaskari/shared/enum';
import { ExceptionNameFinder } from './auto-generated-exception.finder';

export class InternalServerErrorException extends HttpException {
    override statusCode = AppHttpStatusEnum.INTERNAL_SERVER_ERROR;
}
export class FormValidationErrorException extends HttpException {
    override statusCode = AppHttpStatusEnum.BAD_REQUEST;
    override name = ExceptionNameFinder(this);
}
