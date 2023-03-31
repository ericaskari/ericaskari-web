import { ClassValidatorUtility, FormValidationErrorException, InternalServerErrorException } from '@ericaskari/shared/common';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

/**
 * @description this class is responsible for validating the Classes coming from client side
 * and converting them to real ones.
 */
@Injectable()
export class AppValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const { metatype } = metadata;

        const request = plainToClass(metatype, value);

        const validationErrors: ValidationError[] = await validate(request);

        if (validationErrors.length > 0) {
            throw new FormValidationErrorException(ClassValidatorUtility.validationErrorsToFormError(validationErrors));
        }

        return request;
    }
}
