import { plainToClass } from 'class-transformer';

export class GetVersionResponse {
    buildVersion: string | null = null;

    static fromJson(json: Partial<GetVersionResponse>): GetVersionResponse {
        return plainToClass(GetVersionResponse, json, { exposeDefaultValues: true });
    }
}
