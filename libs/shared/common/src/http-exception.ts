import { plainToClass } from 'class-transformer';
import { AppHttpStatusEnum } from '@ericaskari/shared/enum';

export class HttpException extends Error {
    protected readonly statusCode: AppHttpStatusEnum = AppHttpStatusEnum.BAD_REQUEST;
    public override readonly name: string = 'HttpException';

    constructor(
        public readonly formFieldValidationErrors: { [formFieldName: string]: { [key: string]: boolean } } = {},
        public readonly formValidationErrors: { [key: string]: boolean } = {}
    ) {
        super();
    }

    public static fromRequest(model: any) {
        return plainToClass(this, model);
    }

    getFormFieldValidationErrors(): { [formFieldName: string]: { [key: string]: boolean } } {
        return this.formFieldValidationErrors;
    }

    getFormValidationErrors(): { [key: string]: boolean } {
        return this.formValidationErrors;
    }

    getStatus(): number {
        return this.statusCode;
    }

    getName(): string {
        return this.name;
    }
}
