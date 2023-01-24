import { Request, Response } from 'express';
const AWS = require('aws-sdk');

const getInvoice = async (req: Request, res: Response) => {
  const { fileName } = req.params;

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Expires: 500,
  };

  const signedRequest = s3.getSignedUrl('getObject', s3Params);
  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  return res.status(200).json({ success: true, data: signedRequest });
};

export default getInvoice;
