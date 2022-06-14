import convict from 'convict';
import { config as envConfig } from 'dotenv';

envConfig();

const config = convict({
    db: {
        user: {
            doc: 'DB user',
            env: 'STEAM_DB_USER',
            default: '<user>'
        },
        password: {
            doc: 'DB password',
            env: 'STEAM_DB_PASSWORD',
            default: '<password>'
        },
        database: {
            doc: 'DB database name',
            env: 'STEAM_DB_NAME',
            default: 'steam_project'
        },
        host: {
            env: 'STEAM_DB_HOST',
            format: 'String',
            default: 'localhost'
        },
        port : {
            env: 'STEAM_DB_PORT',
            format: 'port',
            default: 5432
        }
    },
    crypt: {
        salt_rounds: {
            env: 'STEAM_DB_SECURITY_SALT_ROUNDS',
            format: 'integer',
            default: 11
        }
    },
    server: {
        port: {
            env: 'STEAM_SERVER_PORT',
            format: 'port',
            default: 3000
        },
        jwt_key: {
            env: 'STEAM_JWT_KEY',
            format: 'String',
            default: 'my-token'
        }
    }
});

config.validate();

export { config };