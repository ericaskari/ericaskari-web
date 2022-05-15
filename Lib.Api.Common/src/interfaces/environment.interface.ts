export interface IEnvironment {
    NODE_ENV: 'test' | 'development' | 'production';
    BUILD_VERSION: string;
    RUNTIME_VERSION: string;
    ENABLE_SWAGGER: boolean;
    ENABLE_MIGRATIONS: boolean;
    HOST_NAME: string;
    SERVER_ADDRESS: string;
    PORT: number;
    FRONTEND_URL: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: number;
    NODE_MAILER_SECURE: boolean;
    NODE_MAILER_HOST: string;
    NODE_MAILER_PORT: number;
    NODE_MAILER_ENABLE_SSL: boolean;
    NODE_MAILER_AUTH_USER: string;
    NODE_MAILER_AUTH_PASS: string;
}
