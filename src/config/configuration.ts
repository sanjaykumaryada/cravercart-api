import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  ENV: Joi.string()
    .valid('development', 'production', 'staging')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  SWAGGER: Joi.string().required(),
  CLIENT_URL: Joi.string().required(),
  API_URL: Joi.string().required(),
});
