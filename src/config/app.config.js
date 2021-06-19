var value = function (env, val) {
  return (typeof env !== "undefined" ? env : val);
};

module.exports = {
  aws: {
    profile: process.env.AWS_CREDENTIALS_PROFILE,
    region: process.env.AWS_CREDENTIALS_REGION,
    s3buciketName: process.env.AWS_S3_BUCKET_NAME
  },
  app: {
    transcription: {
      polllingInterval: parseInt(value(process.env.POLLING_INTERVAL, 3000))
    },
    textSearch: {
      windowMargin: parseInt(value(process.env.WINDOW_MARGIN, 5))
    }
  },
  log4js: {
    appenders: {
      ConsoleLogAppender: {
        type: "console",
        layout: {
          type: "pattern",
          pattern: "[%d{ISO8601_WITH_TZ_OFFSET}]%[[%p]%] %m"
        }
      },
      FileLogAppender: {
        type: "dateFile",
        filename: "./speach2text.log",
        pattern: "yyyyMMdd",
        daysToKeep: 7,
        keepFileExt: true,
        layout: {
          type: "pattern",
          pattern: "[%d{ISO8601_WITH_TZ_OFFSET}][%p] %m"
        }
      }
    },
    categories: {
      "default": {
        appenders: [
          "ConsoleLogAppender",
          "FileLogAppender"
        ],
        level: process.env.LOG_LEVEL || "INFO"
      }
    }
  }
};