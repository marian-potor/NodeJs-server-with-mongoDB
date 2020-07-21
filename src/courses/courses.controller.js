const courseQueries = require('./courses.queries');
const formatResponse = require('../middleware/idTransformer');

module.exports = {
  getCourses: async (req, res, next) => {
    const response = await courseQueries.readAll(next);
    if (response.error) return;
    res.status(response.status).send(response.payload.map(resp => formatResponse(resp)));
  },
  getCourse: async (req, res, next) => {
    const response = await courseQueries.read(req.params.id, next);
    if (response.error) return;
    res.status(response.status).send(formatResponse(response.payload));
  },
  addCourse: async (req, res, next) => {
    const response = await courseQueries.create(req.body,next);
    if (response.error) return;
    res.status(response.status).send(formatResponse(response.payload)); 
  },
  updateCourse: async (req, res, next) => {
    const response = await courseQueries.update(req.params.id, req.body, next);
    if (response.error) return;
    res.status(response.status).send(formatResponse(response.payload));
  },
  removeCourse: async (req, res, next) => {
    const response = await courseQueries.delete(req.params.id, next);
    if (response.error) return;
    res.status(response.status).send(formatResponse(response.payload));
  }
}