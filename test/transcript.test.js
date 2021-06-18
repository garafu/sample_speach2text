const transcript = require("../src/lib/transcript.js");
const aws = require("../src/lib/aws/aws.js");
const s3 = require("../src/lib/aws/s3.js");
const transcription = require("../src/lib/aws/transcription.js");

describe("transcript module", () => {
  beforeEach(() => {
    global.console.log = jest.fn();
  });

  describe("s3", () => {
    beforeEach(() => {
      // AWS S3
      aws.createS3Instance = jest.fn().mockReturnValue({
        upload: jest.fn((params, callback) => {
          callback(null, { Location: "s3://domain/path/to/voice.mp3" });
        })
      });
    });

    it("upload file to S3 bucket", async () => {
      var location = await s3.upload("/path/to/voice.mp3");
      expect(location).toBe("s3://domain/path/to/voice.mp3");
    });
  });

  describe("trascription", () => {
    beforeEach(() => {
      // setTimeout
      global.setTimeout = jest.fn((callback) => { callback(); });
      // AWS Transcription
      var job = {
        TranscriptionJob: {
          TranscriptionJobName: "transcriptionjob-1234567890",
          TranscriptionJobStatus: "QUEUED",
          Transcript: {
            TranscriptFileUri: "s3://domain/path/to/text"
          }
        }
      }
      aws.createTranscribeServiceInstance = jest.fn().mockReturnValue({
        startTranscriptionJob: jest.fn((params, callback) => {
          callback(null, job);
        }),
        getTranscriptionJob: jest.fn()
          .mockImplementationOnce((params, callback) => {
            job.TranscriptionJob.TranscriptionJobStatus = "IN_PROGRESS";
            callback(null, job);
          })
          .mockImplementationOnce((params, callback) => {
            job.TranscriptionJob.TranscriptionJobStatus = "COMPLETED";
            callback(null, job);
          })
      });
    });

    it("start transcription job", async () => {
      var jobName = await transcription.startJob("s3://domain/path/to/voice.mp3");
      expect(jobName).toBe("transcriptionjob-1234567890")
    });

    it("get transcription job", async () => {
      var job = await transcription.getJob("transcriptionjob-1234567890");
      expect(job.TranscriptionJob.TranscriptionJobName).toBe("transcriptionjob-1234567890");
    });

    it("poll transcription job", async () => {
      var fileUrl = await transcription.pollGetJob("transcriptionjob-1234567890")
      expect(fileUrl).toBe("s3://domain/path/to/text");
    });
  });

});