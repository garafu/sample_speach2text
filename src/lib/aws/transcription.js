const aws = require("./aws.js");

/**
 * 
 * @param {string} location 
 * @returns {string} Job name
 */
var startJob = async function (location) {
  return new Promise((resolve, reject) => {
    // var transcribeService = new AWS.TranscribeService({ apiVersion: "2017-10-26" });
    var transcribeService = aws.createTranscribeServiceInstance();

    // See also: 
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/TranscribeService.html#startTranscriptionJob-property
    var params = {
      Media: {
        MediaFileUri: location
      },
      TranscriptionJobName: `abc-speach2text-poc-transcriptionjob-${(new Date()).getTime()}`,
      // ContentRedaction: {
      //   RedactionOutput: "redacted_and_unredacted",
      //   RedactionType: "PII"
      // },
      IdentifyLanguage: false,
      LanguageCode: "ja-JP"
    };

    transcribeService.startTranscriptionJob(params, (err, data) => {
      if (err) {
        console.log("TranscribeService: Job start error", err);
        reject(err);
        return;
      }
      console.log("TranscribeService: Job start success");
      resolve(data.TranscriptionJob.TranscriptionJobName);
    });
  });
};

/**
 * 
 * @param {string} name Transcription Job Name
 * @returns {AWS.TranscriptionJob} Transcription job data.
 */
var getJob = async function (name) {
  return new Promise((resolve, reject) => {
    // var transcribeService = new AWS.TranscribeService({ apiVersion: "2017-10-26" });
    var transcribeService = aws.createTranscribeServiceInstance();

    // See also:
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/TranscribeService.html#getTranscriptionJob-property
    var params = {
      TranscriptionJobName: name
    };

    transcribeService.getTranscriptionJob(params, (err, data) => {
      if (err) {
        console.log("TranscribeService: Get Job info error", err);
        reject(err);
        return;
      }
      console.log("TranscribeService: Get Job info success", data);
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
    var data, status;

    // Get job info.
    data = await getJob(name);
    status = data.TranscriptionJob.TranscriptionJobStatus;

    // Switch by job status.
    switch (status) {
      case "FAILED":    // ERROR
        reject(data.TranscriptionJob.FailureReason);
        break;
      case "COMPLETED": // SUCCESS
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
        }, 3000);
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