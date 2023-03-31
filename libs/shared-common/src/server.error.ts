export interface ServerError {
    name: any;
    statusCode: number;
    formFieldValidationErrors?: { [formFieldName: string]: { [key: string]: boolean } };
    formValidationErrors?: { [key: string]: boolean };
}
