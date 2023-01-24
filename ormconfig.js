const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const SCHEMA_CHANGES = process.env.SCHEMA_CHANGES;

const DB_TYPE = 'postgres';

const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

module.exports = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: SCHEMA_CHANGES,
  logging: SCHEMA_CHANGES,
  entities: [`${SOURCE_PATH}/entity/**/*.{ts,js}`],
  migrations: [`${SOURCE_PATH}/migration/**/*.{ts,js}`],
  subscribers: [`${SOURCE_PATH}/subscriber/**/*.{ts,js}`],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};
