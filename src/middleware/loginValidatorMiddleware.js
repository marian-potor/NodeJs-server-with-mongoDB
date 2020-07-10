const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  user: Joi.string().min(5).max(50).required(),
  password: Joi.string().min(5).max(255).required()
});

module.exports = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}