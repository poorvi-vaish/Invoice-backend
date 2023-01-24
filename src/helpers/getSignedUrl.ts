const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const getSignedS3URL = async (fileName) => {
  try {
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Expires: 500,
    };
    const signedRequest = s3.getSignedUrl('putObject', s3Params);
    return { signedRequest };
  } catch (err) {
    console.log(err);
  }
};

export default getSignedS3URL;
