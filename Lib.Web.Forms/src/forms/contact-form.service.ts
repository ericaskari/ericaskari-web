import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ClassValidatorUtility } from '@ericaskari/common';
import { ContactRequest } from '@ericaskari/model';

@Injectable()
export class ContactFormService {
    public static readonly emailFormControlName: keyof ContactRequest = 'email';
    public static readonly nameFormControlName: keyof ContactRequest = 'name';
    public static readonly subjectFormControlName: keyof ContactRequest = 'subject';
    public static readonly messageFormControlName: keyof ContactRequest = 'message';
    formGroup: FormGroup = new FormGroup(ContactFormService.controllers);

    private static get controllers(): Record<keyof ContactRequest, AbstractControl> {
        return {
            email: new FormControl('', {
                asyncValidators: [
                    ClassValidatorUtility.createFormControlAsyncValidator(ContactRequest, this.emailFormControlName),
                ],
            }),
            name: new FormControl('', {
                asyncValidators: [
                    ClassValidatorUtility.createFormControlAsyncValidator(ContactRequest, this.nameFormControlName),
                ],
            }),
            subject: new FormControl('', {
                asyncValidators: [
                    ClassValidatorUtility.createFormControlAsyncValidator(ContactRequest, this.subjectFormControlName),
                ],
            }),
            message: new FormControl('', {
                asyncValidators: [
                    ClassValidatorUtility.createFormControlAsyncValidator(ContactRequest, this.messageFormControlName),
                ],
            }),
        };
    }

    public get emailFormControl(): FormControl {
        return this.formGroup.get(ContactFormService.emailFormControlName) as FormControl;
    }

    public get nameFormControl(): FormControl {
        return this.formGroup.get(ContactFormService.nameFormControlName) as FormControl;
    }

    public get subjectFormControl(): FormControl {
        return this.formGroup.get(ContactFormService.subjectFormControlName) as FormControl;
    }

    public get messageFormControl(): FormControl {
        return this.formGroup.get(ContactFormService.messageFormControlName) as FormControl;
    }

    public value(): ContactRequest {
        return ContactRequest.fromRequest(this.formGroup.value);
    }
}
