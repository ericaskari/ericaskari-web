import { HttpException } from './http-exception';

// Auto generated file with generate:exports npm command

import {
    NotFoundErrorException,
    UnauthorizedException,
    InternalServerErrorException,
    FormValidationErrorException
} from './exception.list';

export const ExceptionFactory = (
    exceptionName: string,
    formFieldValidationErrors: { [formFieldName: string]: { [key: string]: boolean } } = {},
    formValidationErrors: { [key: string]: boolean } = {}
) => {
    if (exceptionName === 'NotFoundErrorException') {
        return new NotFoundErrorException(formFieldValidationErrors, formValidationErrors);
    }
    if (exceptionName === 'UnauthorizedException') {
        return new UnauthorizedException(formFieldValidationErrors, formValidationErrors);
    }
    if (exceptionName === 'InternalServerErrorException') {
        return new InternalServerErrorException(formFieldValidationErrors, formValidationErrors);
    }
    if (exceptionName === 'FormValidationErrorException') {
        return new FormValidationErrorException(formFieldValidationErrors, formValidationErrors);
    }
    return new HttpException();
};
