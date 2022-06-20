import { HttpException } from "./http-exception";

import {
    InternalServerErrorException
} from './exception.list';

// Auto generated file with generate:exports npm command

export const ExceptionNameFinder = (httpException: HttpException): string => {
    if (httpException instanceof InternalServerErrorException) return 'InternalServerErrorException';
    return 'HttpException';
};