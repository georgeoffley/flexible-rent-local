# Flexible Rent Local

A PoC project for solving local development of the flexible rent product.

## Planned Features
- Take over running aws commands from any terminal
- A Proxy server for HTTP requests to private APIs
  - Handles requesting bearer tokens
  - Adds bearer tokens to header of outgoing API requests

## TODOs:
- [ ] Test that the credentials we get back can be used for sending commands to our AWS resources
- [ ] Figure out saving the credentials
- [ ] Figure out if we're able to send multiple docker exec commands using the session we saved
- [ ] Figure out how to check if session is still valid and throw up mfa check when expired