'use strict';

const { assumeRoleCommand } = require('./assume-role/index');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

// Constants
const ROLE_ARN = 'arn:aws:iam::740118527183:role/hellotill-platform-developer-production';
const SOURCE_PROFILE = 'default';
const MFA_SERIAL = 'arn:aws:iam::740118527183:mfa/george.offley';
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

  // TODO: Create a 'command listener' to get the commands from input
  if(command === 'assume_role') {
    const mfa = await question(
      `<AWS::hellotill> >> Enter MFA code << `
    );
    if(!mfa) {
      console.error('No valid MFA provided');
      process.exit(1);
    }

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