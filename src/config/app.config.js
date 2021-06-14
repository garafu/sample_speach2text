module.exports = {
  CREDENTIALS: {
    PROFILE: process.env.AWS_PROFILE || "default",
    REGION: process.env.AWS_REGION || "ap-northeast-1"
  },
  S3_BUCKET_NAME: ""
};