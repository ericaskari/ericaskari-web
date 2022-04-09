import { plainToClass } from "class-transformer";

export class BootstrapResponseModel {
    version: string | null = null;

    static fromJson(json: Pick<BootstrapResponseModel, keyof BootstrapResponseModel>): BootstrapResponseModel {
        return plainToClass(BootstrapResponseModel, json, { exposeDefaultValues: true });
    }
}
