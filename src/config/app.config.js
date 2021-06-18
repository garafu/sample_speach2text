module.exports = {
  CREDENTIALS: {
    PROFILE: process.env.AWS_PROFILE || "default",
    REGION: process.env.AWS_REGION || "ap-northeast-1"
  },
  AWS_S3_BUCKET_NAME: "abc-speach2text-poc-voice-data-bucket"
};