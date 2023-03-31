import * as dotenv from 'dotenv';
import { bool, cleanEnv, host, num, port, str } from 'envalid';
import { Logger } from '@nestjs/common';
dotenv.config();

export class EnvironmentService {
    private logger = new Logger(EnvironmentService.name);

    private static instance: EnvironmentService | null = null;

    private static spec = {
        APP_NODE_ENV: str({ choices: ['test', 'development', 'production'] }),
        APP_FLOWER_API_SECRET: str(),
        APP_BUILD_VERSION: str(),
        APP_ENABLE_SWAGGER: bool(),
        APP_HOST_NAME: host(),
        APP_IS_SSL_ENABLED: bool(),
        APP_NODE_MAILER_AUTH_USER: str(),
        APP_NODE_MAILER_AUTH_PASS: str(),
        APP_NODE_MAILER_SECURE: bool(),
        APP_NODE_MAILER_REJECT_UNAUTHORIZED: bool(),
        APP_NODE_MAILER_HOST: host(),
        APP_NODE_MAILER_PORT: port(),
        APP_DATABASE_HOST: host(),
        APP_DATABASE_PORT: port(),
        APP_DATABASE_USER: str(),
        APP_DATABASE_PASSWORD: str(),
        APP_DATABASE_NAME: str(),
        APP_DATABASE_SSL: bool({default: false}),
        APP_DATABASE_FAKE_MIGRATION: bool({default: false})
    };

    public init(): void {
        const allowedKeys = Object.keys(EnvironmentService.spec);
        const appEnvs = Object.entries(process.env)
            .filter(([key]) => key.startsWith('APP_'))
            .map(([key]) => key)
            .filter((key) => !allowedKeys.includes(key));

        for (const appEnv of appEnvs) {
            this.logger.warn(`environment variable "${appEnv}" is not in use. please remove.`);
        }
    }

    public readonly variables = cleanEnv(process.env, EnvironmentService.spec);

    public static get getInstance(): EnvironmentService {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new EnvironmentService();
        return this.instance;
    }

    public get isLocalDevelopment(): boolean {
        return this.variables.APP_NODE_ENV === 'development';
    }

    public get isProduction(): boolean {
        return this.variables.APP_NODE_ENV === 'production';
    }

    public get NODE_ENV(): string {
        return this.variables.APP_NODE_ENV;
    }

    public get SERVER_URL(): string {
        const prefix = this.variables.APP_IS_SSL_ENABLED ? 'https://' : 'http://';
        return [prefix, this.variables.APP_HOST_NAME].join('');
    }
}
