import AWS from 'aws-sdk';

const snsClient = new AWS.SNS({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region : process.env.REGION
});

const iosDevCreateEndpointParams = {
  PlatformApplicationArn: process.env.AWS_SNS_IOS_DEV_ARN, 
  Token: '', // pass key
  CustomUserData: '', // pass file body
};

const iosProdCreateEndpointParams = {
  PlatformApplicationArn: process.env.AWS_SNS_IOS_PROD_ARN, 
  Token: '', // pass key
  CustomUserData: '', // pass name and staff ID
};

const subscribeParams = {
  Protocol: 'application',
  TopicArn: process.env.AWS_SNS_TOPIC,
  Endpoint: '', // pass endpoint 
};

const publishParams = {
  Message: '',
  MessageStructure: 'json',
  TopicArn: process.env.AWS_SNS_TOPIC,
};

const sns = {
  snsClient: snsClient,
  iosDevCreateEndpointParams: iosDevCreateEndpointParams,
  iosProdCreateEndpointParams: iosProdCreateEndpointParams,
  subscribeParams: subscribeParams,
  publishParams: publishParams,
};

export default sns;
