const baseAbsPath = __dirname + '/';

const Logger = require(baseAbsPath + "utils/Logger");
const logger = Logger.instance.getLogger();

const express = require('express');
const app = express();
const http = require('http').Server(app);

const constants = require(baseAbsPath + '../common/constants');

// Body parser middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*------------------------*/

/**
 * @apiGroup Constants 
 * @api {get} /retCode/v:version/list RetCodeList 
 *
 * @apiSuccess {Object} N/A A single-level retCode dictionary.
 *
 */
app.get(constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.RET_CODE + constants.ROUTE_PARAMS.API_VER + constants.ROUTE_PATHS.LIST, function(req, res) {
  const toLogMsg = constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.RET_CODE + constants.ROUTE_PARAMS.API_VER + constants.ROUTE_PATHS.LIST;
  logger.info(toLogMsg);
  res.json(constants.RET_CODE);
});

/**
 * @apiGroup Constants 
 * @api {get} /regex/v:version/list RegexList 
 *
 * @apiSuccess {Object} N/A A single-level regex dictionary.
 *
 */
app.get(constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.REGEX + constants.ROUTE_PARAMS.API_VER + constants.ROUTE_PATHS.LIST, function(req, res) {
  const toLogMsg = constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.REGEX + constants.ROUTE_PARAMS.API_VER + constants.ROUTE_PATHS.LIST;
  logger.info(toLogMsg);
  let toRet = {};
  for (let k in constants.REGEX) {
    toRet[k] = constants.REGEX[k].toString();
  }
  res.json(toRet);
});

const port = constants.PORT;
http.listen(port, function() {
  try {
    logger.info('Api service listening on port ' + port + '. ' + Date.now());
  } catch (err) {
    logger.error(err.stack);
  }
});

process.on('uncaughtException', (err) => {
  logger.error(err.stack);
});
