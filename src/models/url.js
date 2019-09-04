/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const AWS = require('aws-sdk');
const crc32 = require('js-crc').crc32;
const moment = require('moment');

const dynamoDbConfig = {
  apiVersion: '2012-08-10',
  region: process.env.AWS_REGION
};
/* global isLocal:true */
if (isLocal()) {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'dev' });
}
const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoDbConfig);

/**
 * Membership class
 */
class URL {
  constructor() {
    this.tableName = (isLocal()) ? 'urls-dev' : `urls-${process.env.NODE_ENV}`;
    this.fillable = [
      'key',
      'url',
      'visits'
    ];
  }

  /**
   * Filter input by fillable
   *
   * @param {*} data
   */
  filterFields(data) {
    const local = data;
    Object.keys(data).filter(v => (this.fillable.indexOf(v) === -1)).forEach((v) => {
      delete local[v];
    });

    return local;
  }

  /**
   * Get item by key
   *
   * @param {*} key Object map key:value
   */
  async getItem(key) {
    try {
      const paramsGet = {
        TableName: this.tableName,
        Key: key
      };
      const res = await dynamoDb.get(paramsGet).promise();
      if (!res.Item) {
        return null;
      }
      return res.Item;
    } catch (err) {
      console.log('err', err);
      return null;
    }
  }


  /**
   * Create an item if it doesn't exist
   *
   * @param {*} data Object to create
   */
  async createItem(data) {
    try {
      console.log(this.tableName);
      const localData = this.filterFields(data);
      localData.key = crc32(data.url);
      const datetime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      localData.createdAt = datetime;
      localData.updatedAt = localData.createdAt;

      const paramsPut = {
        TableName: this.tableName,
        Item: localData
      };
      const res = await dynamoDb.put(paramsPut).promise();
      if (res) {
        return localData;
      }
      return null;
    } catch (err) {
      console.log(err);
      return false;
    }
  }


  /**
   * Get all items
   */
  async getAllItems() {
    try {
      const paramsScan = {
        TableName: this.tableName
      };
      const res = await dynamoDb.scan(paramsScan).promise();
      if (!res.Items) {
        return [];
      }
      return res.Items;
    } catch (err) {
      console.log('err', err);
      const localError = new ApiError(500, 'DYNAMODB_ERROR', err);
      await localError.log();
      return [];
    }
  }
}

module.exports = URL;
