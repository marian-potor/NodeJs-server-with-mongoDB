const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  username: Joi.when(
    Joi.string().email(), {
      then: Joi.forbidden().error(new Error('Username can not be a email.')),
      otherwise: Joi.string().min(5).max(50).required()
    }),
  password: Joi.string().min(5).max(255).required(),
  repeatPassword: Joi.ref('password'),
  email: Joi.string().required().email(),
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
});

module.exports = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details ? error.details[0].message : error.message);
  next();
}