const baseAbsPath = __dirname + '/';

const singleton = Symbol();
const singletonEnforcer = Symbol();

const bunyan = require('bunyan');

class Logger {
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Logger(singletonEnforcer);
    }
    return this[singleton];
  }

  constructor(enforcer) {
    if (enforcer != singletonEnforcer) {
      throw "Cannot construct singleton";
    }
    this._defaultLogger = bunyan.createLogger({
      name: 'default',
      streams: [
        {
          level: 'info',
          stream: process.stdout            
        },
        {
          level: 'error',
          stream: process.stderr 
        }
      ]
    });
    this._loggerDict = {
      'default': this._defaultLogger
    };
  }

  getLogger(name) {
    const instance = this;
    if (name in instance._loggerDict) {
      return instance._loggerDict[name];
    }
    return instance._defaultLogger;
  }
}

module.exports = Logger;
