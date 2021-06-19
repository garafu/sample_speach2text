const log4js = require("log4js");
const config = require("../../config/app.config").log4js;
var logger;

log4js.configure(config);

logger = log4js.getLogger();

module.exports = logger;
