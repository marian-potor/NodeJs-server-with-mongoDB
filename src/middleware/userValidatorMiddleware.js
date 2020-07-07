const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  username: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(5).max(50).required(),
  email: Joi.email().required(),
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
});

module.exports = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  next();
}