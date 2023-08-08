'use strict';

const { Config } = require('../lib/config');

const configuration = new Config();

async function assumeRoleCommand({
  roleArn,
  roleSessionName,
  durationSeconds = 10800,
  serialNumber,
  tokenCode = '',
}) {
  const { stsClient } = configuration.getStsClient();
  const params = {
    RoleArn: roleArn,
    RoleSessionName: roleSessionName,
    DurationSeconds: durationSeconds,
    SerialNumber: serialNumber,
    TokenCode: tokenCode,
  };

  console.debug({params}, 'Params');

  try {
    const Credentials = await stsClient.assumeRole(params).promise();
    if(!Credentials) {
      console.error('No data returned from STS');
      throw new Error('Error assuming role');
    }
    return { Credentials };
  } catch (error) {
    console.error(error);
    throw new Error('Error');
  }
}

module.exports = { assumeRoleCommand };