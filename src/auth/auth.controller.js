const userQueries = require('../users/users.queries');

module.exports = {
  login: async (req, res) => {
    result = await userQueries.auth(req.body);
    if (result.status === 200) {
      res.status(result.status).send(result.payload.generateAuthToken());
      return;
    }
    res.status(result.status).send(result.payload);
  }
};