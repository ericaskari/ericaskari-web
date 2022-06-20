import { HttpException } from "./http-exception";

// Auto generated file with generate:exports npm command

import {
    InternalServerErrorException
} from './exception.list';

export const ExceptionFactory = (
    exceptionName: string,
    formFieldValidationErrors: { [formFieldName: string]: { [key: string]: boolean } } = {},
    formValidationErrors: { [key: string]: boolean } = {}
) => {
    if (exceptionName === 'InternalServerErrorException') {
        return new InternalServerErrorException(formFieldValidationErrors, formValidationErrors);
    }
    return new HttpException();
};