import { HttpException } from "./http-exception";

import {
    InternalServerErrorException,
    FormValidationErrorException
} from './exception.list';

// Auto generated file with generate:exports npm command

export const ExceptionNameFinder = (httpException: HttpException): string => {
    if (httpException instanceof InternalServerErrorException) return 'InternalServerErrorException';
    if (httpException instanceof FormValidationErrorException) return 'FormValidationErrorException';
    return 'HttpException';
};