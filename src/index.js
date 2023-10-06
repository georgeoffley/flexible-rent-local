'use strict';
require('dotenv').config();

const { assumeRoleCommand } = require('./assume-role/index');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

// Constants
const ROLE_ARN = process.env.ROLE_ARN;
const SOURCE_PROFILE = process.env.SOURCE_PROFILE;
const MFA_SERIAL = process.env.MFA_SERIAL;
const WHOAMI = process.env['WHOAMI'];
const DATE = process.env['DATE'];

// Get inputs
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const util = require('util');
const question = util.promisify(rl.question).bind(rl);


(async () => {
  if(process.argv.length < 3) {
    console.error('Expecting at least one more argument');
    process.exit(1);
  }
  if(process.argv[2] != 'frde') {
    console.error('Command not recognized');
    process.exit(1);
  }

  const command = process.argv[3];
  if (!command) {
    console.error('No command provided');
    process.exit(1);
  }

  const mfa = process.argv[4];
  if(!command) {
    console.error('No MFA COde provided')
    process.exit(1);
  }

  // TODO: Create a 'command listener' to get the commands from input
  if(command === 'assume_role') {
    const { Credentials } = await assumeRoleCommand({
      roleArn: ROLE_ARN,
      roleSessionName: `cli-${WHOAMI}-${DATE}`,
      serialNumber: MFA_SERIAL,
      tokenCode: mfa,
    })
    if (!Credentials) {
      console.error('Unable to get credentials');
      process.exit(1);
    }

    console.log({Credentials}, 'Successfully grabbed credentials');
    process.exit(0);
  }
})();