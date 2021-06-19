module.exports = {
  AWS_CREDENTIALS_PROFILE: process.env.AWS_CREDENTIALS_PROFILE || "default",
  AWS_CREDENTIALS_REGION: process.env.AWS_CREDENTIALS_REGION || "ap-northeast-1",
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "abc-speach2text-poc-voice-data-bucket"
};