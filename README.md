# Flexible Rent Local

A PoC project for solving local development strain for the flexible rent product.

## Idea
The idea is to create a project that handles sending HTTP requests by acting as a proxy which will handle getting the required header tokens without engineer intervention. 

Additionally, this system will persist needed AWS credentials into each new terminal session started by an engineer.


## Planned Features
- Take over running aws commands from any terminal
- A Proxy server for HTTP requests to private APIs (Internal AWS Systems, third parties like CRB and or loan pro)
  - Handles requesting bearer tokens
  - Adds bearer tokens to header of outgoing API requests

## Running The Docker Container

```bash
docker run \
-it \
--rm \
-p 3000:3000 \
-v $(pwd):/app \
-v ~/.aws:/root/.aws \
--name frde_local \
-e WHOAMI="$(whoami)" \
-e DATE="$(date +%s)" \
flexible-rent-local
```

The command above is used to do the following:
- Make the terminal interactive
- Make sure container is removed when the container is stopped
- Maps the local port to the container port (not working at the moment)
- Mount the local (On your dev machine) directory with the directory within the docker container so that source code development can continue without having to rebuild the docker image.
- Mount the local (on your dev machine) AWS config files and pipe them into the container. This was the AWS tools can use this and we don't have to enter any confidential AWS details at run time.
- Create the name for the container to make it easier to send commands to
- Pass in the date and `whoami` info for the session information

## Sending commands to the container

```bash
docker exec -it frde_local sh -c "node src/index.js frde assume_role"
```

This makes the command interactive and lets you pass in the commands.

The position of the commands is important as the argument parsing is position dependant (for now). 

- `node src/index.js` - First command for running the script
- `frde` - Command for the system to understand that we want it to do something
- `assume_role` - The command for app to do something with

## TODOs:
- [ ] Test that the credentials we get back can be used for sending commands to our AWS resources
- [ ] Figure out saving the credentials
- [ ] Figure out if we're able to send multiple docker exec commands using the session we saved
- [ ] Figure out how to check if session is still valid and throw up mfa check when expired