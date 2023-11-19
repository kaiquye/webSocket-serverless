import * as AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION });

const AWS_SES = new AWS.SES();
export default AWS_SES;
