export const EnvConfig = {
  PORT: Number(process.env.PORT ?? 3000),
  NODE_ENV: process.env.NODE_ENV || 'test',
  SALT_HASH: process.env.SALT_HASH || 'salt',
  PUBLIC_KEY: process.env.PUBLIC_KEY || 'public_key',
  EXP: 1000,
};
