'use strict';

const aws = require('aws-sdk');

class Config {
  getStsClient() {
    const stsClient = new aws.STS();
    return { stsClient };
  }
}

module.exports = { Config };