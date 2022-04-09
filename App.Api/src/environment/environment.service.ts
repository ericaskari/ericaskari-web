import { Injectable } from "@nestjs/common";
import { config as dotenvConfig } from "dotenv";
import { cleanEnv } from 'envalid'

@Injectable()
export class EnvironmentService {

    init() {
        if (process.env.NODE_ENV !== 'production') {
            dotenvConfig({ path: './.backend.env' });
        }

        const env = cleanEnv(process.env, {
            // NODE_ENV:                                   str({ choices: ['development', 'production']}),
            // ENABLE_SWAGGER:                             bool({ desc: 'Enable/Disable Swagger' }),
            // ENABLE_MIGRATIONS:                          bool({ desc: 'Enable/Disable Migration' }),
            // DATABASE_HOST:                              host(),
            // DATABASE_PORT:                              port(),
            // DATABASE_USER:                              str(),
            // DATABASE_PASSWORD:                          str(),
            // DATABASE_NAME:                              str(),
            // BCRYPT_SALT:                                num(),
            // JWT_LOGIN_TOKEN_SECRET:                     str(),
            // JWT_LOGIN_TOKEN_EXPIRE_IN:                  num(),
            // JWT_EMAIL_VERIFICATION_TOKEN_EXPIRE_IN:     num(),
            // NODE_MAILER_HOST:                           host(),
            // NODE_MAILER_PORT:                           port(),
            // NODE_MAILER_SSL:                            bool()
        });
    }
}

