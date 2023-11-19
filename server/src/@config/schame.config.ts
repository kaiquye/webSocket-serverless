import * as joi from 'joi';

export const CONSTANTSSchema = {
  isGlobal: true,
  validationSchema: joi.object({
    PORT: joi.number().required(),
    NODE_ENV: joi.string().valid('development', 'sandbox', 'production', 'test'),
    SALT_HASH: joi.string().required(),
    PUBLIC_KEY: joi.string().required(),
    EMAIL_SENDER: joi.string().required(),
  }),
};
