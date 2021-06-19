const INTERVAL = require("../../config/app.config.js").app.transcription.polllingInterval;
const logger = require("../log/logger.js");
const aws = require("./aws.js");

/**
 * Start TranscribeService Job.
 * @param {string} location 
 * @returns {string} Job name
 */
var startJob = async function (location) {
  return new Promise((resolve, reject) => {
    var transcribeService = aws.createTranscribeServiceInstance();

    // See also: 
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/TranscribeService.html#startTranscriptionJob-property
    var params = {
      Media: {
        MediaFileUri: location
      },
      TranscriptionJobName: `abc-speach2text-poc-transcriptionjob-${(new Date()).getTime()}`,
      IdentifyLanguage: false,
      LanguageCode: "ja-JP"
    };

    transcribeService.startTranscriptionJob(params, (err, data) => {
      if (err) {
        logger.error("TranscribeService start job error: ", err.message);
        reject(err);
        return;
      }
      var jobName = data.TranscriptionJob.TranscriptionJobName;
      logger.info("Start transcribe job -> ", jobName);
      resolve(jobName);
    });
  });
};

/**
 * Get TranscribeService Job information.
 * @param {string} name Transcription Job Name
 * @returns {AWS.TranscriptionJob} Transcription job data.
 */
var getJob = async function (name) {
  return new Promise((resolve, reject) => {
    var transcribeService = aws.createTranscribeServiceInstance();

    // See also:
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/TranscribeService.html#getTranscriptionJob-property
    var params = {
      TranscriptionJobName: name
    };

    transcribeService.getTranscriptionJob(params, (err, data) => {
      if (err) {
        logger.error("TranscribeService: get job info error: ", err.message);
        reject(err);
        return;
      }
      var jobName = data.TranscriptionJob.TranscriptionJobName;
      var status = data.TranscriptionJob.TranscriptionJobStatus;
      logger.info(`Get transcribe job status -> ${jobName}:${status}`);
      resolve(data);
    });
  });
};


/**
 * Poll until job complete.
 * @param {string} name Translation Job Name
 * @returns {Promise<string>} Transcripted file uri
 */
var pollGetJob = async function (name) {
  return new Promise(async (resolve, reject) => {
    var data, jobName, status;

    // Get job info.
    data = await getJob(name);
    jobName = data.TranscriptionJob.TranscriptionJobName;
    status = data.TranscriptionJob.TranscriptionJobStatus;

    // Switch by job status.
    switch (status) {
      case "FAILED":    // ERROR
        reject(data.TranscriptionJob.FailureReason);
        break;
      case "COMPLETED": // SUCCESS
        logger.info(`Complete transcribe job -> ${jobName}`)
        resolve(data.TranscriptionJob.Transcript.TranscriptFileUri);
        break;
      default:          // RE-TRY
        setTimeout(async () => {
          try {
            var uri = await pollGetJob(name);
            resolve(uri);
          } catch (reason) {
            reject(reason);
          }
        }, INTERVAL);
        break;
    }
  });
};

var execute = async function(location){
  var jobName = await startJob(location);
  var fileUri = await pollGetJob(jobName);
  return fileUri;
};

module.exports = {
  startJob,
  getJob,
  pollGetJob,
  execute
};