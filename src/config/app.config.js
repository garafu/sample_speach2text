module.exports = {
  AWS_CREDENTIALS_PROFILE: process.env.AWS_CREDENTIALS_PROFILE || "default",
  AWS_CREDENTIALS_REGION: process.env.AWS_CREDENTIALS_REGION || "ap-northeast-1",
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "abc-speach2text-poc-voice-data-bucket",
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
        level: "INFO"
      }
    }
  }
};