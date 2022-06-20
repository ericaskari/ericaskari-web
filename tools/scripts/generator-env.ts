import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const seed = `NODE_ENV=development
BUILD_VERSION=local-development
ENABLE_SWAGGER=true
ENABLE_MIGRATIONS=false
HOST_NAME=ericaskari.localnet
ENABLE_SSL=true
EMAIL_SERVER_HOST=localhost
EMAIL_SERVER_PORT=1025
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USER=user
DATABASE_SYNCHRONIZE=false
DATABASE_DROP_SCHEMA=false
DATABASE_PASSWORD=FzTCMTTDERRn*8Yp@eEqW
DATABASE_NAME=ericaskari
BCRYPT_SALT=10
JWT_LOGIN_TOKEN_SECRET=Password0!
JWT_LOGIN_TOKEN_EXPIRE_IN=3600
JWT_EMAIL_VERIFICATION_TOKEN_EXPIRE_IN=3600
JWT_PASSWORD_RESET_TOKEN_EXPIRE_IN=3600
NODE_MAILER_HOST=localhost
NODE_MAILER_PORT=1025
NODE_MAILER_ENABLE_SSL=false

#   docker-compose prefix
COMPOSE_PROJECT_NAME=ericaskari-development
COMPOSE_SERVICE_NAME=ericaskari-development

#   docker-compose ericaskari-development--postgres environment variables
POSTGRES_USER=ericaskariUser
POSTGRES_PASSWORD=YkgJmYJxgfx7nVj7Me@FzTCMTTDERRn*8Yp@eEqW
POSTGRES_DB=lo-hi

#   docker-compose ericaskari-development--minio environment variables
MINIO_ROOT_USER=ericaskari-development--user
MINIO_ROOT_PASSWORD=Password0!
`;

const location = resolve(process.cwd(), '.env');

if (!existsSync(location)) {
    writeFileSync(location, seed);
    console.log(`.env with default settings generated.`);
} else {
    console.log(`.env file exists. skipping default setting generator.`);
}
