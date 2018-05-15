const baseAbsPath = __dirname + '/';

const Logger = require(baseAbsPath + "utils/Logger");
const logger = Logger.instance.getLogger();

try {
  logger.info("Booted. " + Date.now());
} catch (err) {
  logger.error(err.stack);
}

process.on('uncaughtException', (err) => { 
  logger.error(err.stack);
});
