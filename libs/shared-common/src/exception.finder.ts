import { HttpException } from './http-exception';

import {
    NotFoundErrorException,
    UnauthorizedException,
    InternalServerErrorException,
    FormValidationErrorException
} from './exception.list';

// Auto generated file with generate:exports npm command

export const ExceptionNameFinder = (httpException: HttpException): string => {
    if (httpException instanceof NotFoundErrorException) return 'NotFoundErrorException';
    if (httpException instanceof UnauthorizedException) return 'UnauthorizedException';
    if (httpException instanceof InternalServerErrorException) return 'InternalServerErrorException';
    if (httpException instanceof FormValidationErrorException) return 'FormValidationErrorException';
    return 'HttpException';
};
