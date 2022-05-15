import { AbstractControl, ValidationErrors } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { validate, ValidationError } from 'class-validator';
import { map } from 'rxjs/operators';
import { ClassConstructor } from 'class-transformer/types/interfaces';

export interface FormFieldError {
    [key: string]: boolean;
}


export class ClassValidatorUtility {
    /**
     * Converts class-validator errors to Angular form async Validator
     * @param convertClass Class which has fromRequest as static method
     * @param key Form key and Class key
     */
    static createFormControlAsyncValidator<T>(convertClass: ClassConstructor<T>, key: keyof T) {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            //  Creating instance with just given key
            const instance = (convertClass as any).fromRequest({ [key]: control.value });
            //  Validating with class-validator
            const validateAsync: Promise<ValidationError[]> = validate(instance);
            //  Observable
            const validate$ = from(validateAsync);
            return validate$.pipe(
                //  get specific key errors
                map((errors: ValidationError[]) => errors.find((error) => error.property === key) || null),
                //  convert constraints keys to array
                map((error: ValidationError | null) => (error ? Object.keys(error.constraints || {}) : [])),
                //  convert to translator format
                map((constraints: string[]) => this.constraintsToLocalizationString(constraints)),
                //  convert to angular format
                map((constraints: string[]) => constraints.map((constraint) => ({ [constraint]: true }))),
                //  flatten inner objects
                map(
                    (constraints: Record<string, boolean>[]): Record<string, boolean> =>
                        constraints.reduce((oldObj, newObj) => ({ ...oldObj, ...newObj }), {})
                )
            );
        };
    }

    static validationErrorsToFormError(validationErrors: ValidationError[]): { [formFieldName: string]: FormFieldError } {
        const data = validationErrors.map((validationError: ValidationError): { [formFieldName: string]: FormFieldError } => {
            const constraintKeys: string[] = Object.keys(validationError.constraints || {});

            const formFieldErrors: FormFieldError[] = constraintKeys.map((key: string): FormFieldError => ({ [key]: true }));

            const propertyErrors: FormFieldError = formFieldErrors.reduce((oldErr, newErr) => ({ ...oldErr, ...newErr }), {});

            return { [validationError.property]: propertyErrors };
        });

        return data.reduce((old, newOne) => ({ ...old, ...newOne }), {});
    }

    static constraintsToLocalizationString(constraints: string[]): string[] {
        return constraints.map((constraint) => `fieldValidation.${ constraint }`);
    }

    static exceptionNameToLocalizationString(exceptionName: string): string {
        return `exceptions.${ exceptionName }`;
    }
}
