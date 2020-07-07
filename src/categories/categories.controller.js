const categoriesQueries = require('../categories/categories.queries');
const formatResponse = require('../middleware/idTransformer');

module.exports = {
  createCategory: async (req, res) => {
    const result = await categoriesQueries.create(req.body);
    res.status(result.status).send(formatResponse(result.payload));
  },
  getCategory: async (req, res) => {
    const result = await categoriesQueries.read(req.params.id);
    res.status(result.status).send(formatResponse(result.payload));
  },
  getCategories: async (req, res) => {
    const result = await categoriesQueries.readAll();
    res.status(result.status).send(result.payload.map(resp => formatResponse(resp)));
  },
  updateCategory: async (req, res) => {
    const result = await categoriesQueries.update(req.params.id, req.body);
    res.status(result.status).send(formatResponse(result.payload));
  },
  removeCategory: async (req, res) => {
    const result = await categoriesQueries.remove(req.params.id);
    res.status(result.status).send(formatResponse(result.payload));
  }
}