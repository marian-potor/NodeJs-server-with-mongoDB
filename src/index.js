const processCheck = require('./startup/processCheck');
const DB = require('./startup/mongoDB');
const {port} = require('../config');
const express = require('express');
const app = express();
const routes = require('./startup/routes');
const errorHandler = require('./middleware/errorHandlingMiddleware');
const logger = require('./startup/logger');

processCheck(); 
DB.init();
routes.init(app);
app.use(errorHandler);

app.listen(port, logger.info(`Listening on port ${port}`));
