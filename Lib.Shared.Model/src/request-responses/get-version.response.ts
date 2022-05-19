import { plainToClass } from 'class-transformer';

export class GetVersionResponse {
    version: string | null = null;

    static fromJson(json: Pick<GetVersionResponse, keyof GetVersionResponse>): GetVersionResponse {
        return plainToClass(GetVersionResponse, json, { exposeDefaultValues: true });
    }
}
