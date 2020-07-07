const userQueries = require('../users/users.queries');
const formatResponse = require('../middleware/idTransformer');

module.exports = {
  createUser: async (req, res) => {
    result = await userQueries.create(req.body);
    res.status(result.status).send(formatResponse(result.payload))
  },
  getUser: async (req, res) => {
    result = await userQueries.read(req.query);
    console.log(result)
    res.status(result.status).send([formatResponse(result.payload)]);
  },
  checkUser: async (req, res) => {
    result = await userQueries.checkUsername(req.query.username);
    res.status(result.status).send(result.payload);
  },
  updateUser: async (req, res) => {
    result = await userQueries.update(req.params.id, req.body);
    res.status(result.status).send(formatResponse(result.payload))
  }
}