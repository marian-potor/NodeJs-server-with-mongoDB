const Joi = require('@hapi/Joi');

categorySchema = Joi.object({
  name: Joi.string().min(2).max(255).required()
});

module.exports = (req, res, next) => {
  const {error} = categorySchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}