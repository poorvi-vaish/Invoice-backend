const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = async (fileName, pdf) => {
  try {
    console.log('uploadFile', s3);
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: pdf,
      ContentType: 'application/pdf',
    };

    console.log('s3Params', s3Params);
    const upload = await s3.upload(s3Params).promise();
    console.log('upload', upload);
    return upload;
  } catch (err) {
    console.log(err);
  }
};

export default uploadFile;
