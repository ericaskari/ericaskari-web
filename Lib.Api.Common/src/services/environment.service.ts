import * as dotenv from 'dotenv';
import { bool, cleanEnv, host, port, str, url } from 'envalid';
import { CleanedEnvAccessors, ValidatorSpec } from "envalid/dist/types";
import { IEnvironment } from "../interfaces/environment.interface";

export class EnvironmentService {
    private readonly environment: Readonly<IEnvironment & CleanedEnvAccessors>;

    constructor() {
        //  Real env vars always have the highest precedence
        dotenv.config();

        this.environment = cleanEnv(process.env, {
            NODE_ENV: str({ devDefault: 'development', choices: [ 'test', 'development', 'production' ] }),
            BUILD_VERSION: str({
                devDefault: 'local-development',
                desc: 'docker image tag when building the docker image'
            }),
            RUNTIME_VERSION: str({
                devDefault: 'local-development',
                desc: 'docker image tag when deploying the docker image'
            }),
            ENABLE_SWAGGER: bool({ devDefault: true, default: true, desc: 'Enable/Disable Swagger' }),
            ENABLE_MIGRATIONS: bool({ devDefault: true, default: true, desc: 'Enable/Disable Migration' }),
            HOST_NAME: host({ default: '0.0.0.0', devDefault: '0.0.0.0' }),
            SERVER_ADDRESS: host({ default: 'localhost', devDefault: '127.0.0.1' }),
            PORT: port({ default: 8000, devDefault: 8000 }),
            FRONTEND_URL: url({ devDefault: 'http://127.0.0.1:8443' }),
            EMAIL_SERVER_HOST: host({ devDefault: 'localhost' }),
            EMAIL_SERVER_PORT: port({ devDefault: 1025 }),
            NODE_MAILER_HOST: host({ devDefault: 'localhost' }),
            NODE_MAILER_PORT: port({ devDefault: 1025 }),
            NODE_MAILER_ENABLE_SSL: bool({ devDefault: false }),
            NODE_MAILER_AUTH_USER: str(),
            NODE_MAILER_AUTH_PASS: str(),
        } as {
            [K in keyof IEnvironment]: ValidatorSpec<IEnvironment[K]>;
        });
    }

    public static get instance(): EnvironmentService {
        return new EnvironmentService();
    }

    public get isLocalDevelopment(): boolean {
        return this.environment.NODE_ENV === 'development';
    }

    public get isProduction(): boolean {
        return this.environment.NODE_ENV === 'production';
    }

    public get NODE_ENV(): string {
        return this.environment.NODE_ENV;
    }

    public get BUILD_VERSION(): string {
        return this.environment.BUILD_VERSION;
    }

    public get RUNTIME_VERSION(): string {
        return this.environment.RUNTIME_VERSION;
    }

    public get ENABLE_SWAGGER(): boolean {
        return this.environment.ENABLE_SWAGGER;
    }

    public get ENABLE_MIGRATIONS(): boolean {
        return this.environment.ENABLE_MIGRATIONS;
    }

    public get HOST_NAME(): string {
        return this.environment.HOST_NAME;
    }

    public get SERVER_ADDRESS(): string {
        return this.environment.SERVER_ADDRESS;
    }

    public get PORT(): number {
        return this.environment.PORT;
    }

    public get FRONTEND_URL(): string {
        return this.environment.FRONTEND_URL;
    }

    public get EMAIL_SERVER_HOST(): string {
        return this.environment.EMAIL_SERVER_HOST;
    }

    public get EMAIL_SERVER_PORT(): number {
        return this.environment.EMAIL_SERVER_PORT;
    }

    public get NODE_MAILER_HOST(): string {
        return this.environment.NODE_MAILER_HOST;
    }

    public get NODE_MAILER_PORT(): number {
        return this.environment.NODE_MAILER_PORT;
    }

    public get NODE_MAILER_AUTH_USER(): string {
        return this.environment.NODE_MAILER_AUTH_USER;
    }

    public get NODE_MAILER_AUTH_PASS(): string {
        return this.environment.NODE_MAILER_AUTH_PASS;
    }

    private devAndTestDefault(devDefault: string, testDefault: string): string {
        return process.env['NODE_ENV'] === 'test' ? testDefault : devDefault;
    }
}
