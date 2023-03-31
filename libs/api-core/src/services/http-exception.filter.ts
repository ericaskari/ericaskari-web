import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionNameFinder, HttpException, ServerError } from '@ericaskari/shared/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(httpException: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const statusCode = httpException.getStatus();

        const formFieldValidationErrors: { [formFieldName: string]: { [key: string]: boolean } } =
            httpException.getFormFieldValidationErrors();
        // const formFieldValidationErrors: { [formFieldName: string]: FormFieldError } =
        //     ClassValidatorUtility.validationErrorsToFormError(validationErrors);

        const formValidationErrors = httpException.getFormValidationErrors();

        const name = ExceptionNameFinder(httpException);

        const serverError: ServerError = {
            name,
            statusCode,
            formFieldValidationErrors,
            formValidationErrors
        };

        console.log(serverError);

        response.status(statusCode).json(serverError);
    }
}
