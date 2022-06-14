import type { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";
import { config as convintConfig } from './config';

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: convintConfig.get('db'),
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMappers()
  }
};

export default knexConfig;