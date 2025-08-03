import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
//config aws
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-south-1',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();


export default dynamodb;
