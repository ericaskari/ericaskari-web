import * as dotenv from 'dotenv';
import { bool, cleanEnv, host, port, str } from 'envalid';
import { CleanedEnvAccessors, ValidatorSpec } from 'envalid/dist/types';
import { IEnvironment } from '../interfaces/environment.interface';

export class EnvironmentService {
    private readonly environment: Readonly<IEnvironment & CleanedEnvAccessors>;

    constructor() {
        //  Real env vars always have the highest precedence
        dotenv.config();

        this.environment = cleanEnv(process.env, {
            NODE_ENV: str({ devDefault: 'development', choices: ['test', 'development', 'production'] }),
            BUILD_VERSION: str({
                devDefault: 'local-development',
                desc: 'docker image tag when building the docker image',
            }),
            RUNTIME_VERSION: str({
                devDefault: 'local-development',
                desc: 'docker image tag when deploying the docker image',
            }),
            ENABLE_SWAGGER: bool({ devDefault: true, default: true, desc: 'Enable/Disable Swagger' }),
            ENABLE_MIGRATIONS: bool({ devDefault: true, default: true, desc: 'Enable/Disable Migration' }),
            NODE_MAILER_HOST: host({ devDefault: 'localhost' }),
            NODE_MAILER_PORT: port({ devDefault: 1025 }),
            NODE_MAILER_ENABLE_SSL: bool({ devDefault: false }),
            NODE_MAILER_AUTH_USER: str(),
            NODE_MAILER_AUTH_PASS: str(),
            NODE_MAILER_SECURE: bool(),
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

    public get NODE_MAILER_SECURE(): boolean {
        return this.environment.NODE_MAILER_SECURE;
    }

    private devAndTestDefault(devDefault: string, testDefault: string): string {
        return process.env['NODE_ENV'] === 'test' ? testDefault : devDefault;
    }
}
