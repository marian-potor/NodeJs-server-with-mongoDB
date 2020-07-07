const Joi = require('@hapi/joi');

const courseSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  author: Joi.string().min(2).max(255).required(),
  level: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
  category: Joi.string().required(),
  isPublished: Joi.boolean().required(),
  price: Joi.number().min(10).max(300)
    .when('isPublished', {is: true, then: Joi.required(), otherwise: Joi.optional()}),
  date: Joi.date(),
  tags: Joi.array()
});

module.exports = (req, res, next) => {
  const { error } = courseSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}