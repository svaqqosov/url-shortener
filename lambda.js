global.basePath = __dirname;
module.require('dotenv').load();
const awsServerlessExpress = module.require('aws-serverless-express');

const app = module.require('./src/app');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context, callback) => {
  /* eslint-disable no-param-reassign */
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // If event is comming from API Gateway
    if (event.pathParameters && event.pathParameters.proxy) {
      awsServerlessExpress.proxy(server, event, context);
    }
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
