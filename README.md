# TideCloak Javascript client example
This repo provides an example implementing TideCloak in a web application.

To run, host the ReactJS example on http://localhost:6001 and use your Tide credentials on Tide's Fabric. The default settings are set to Tide's staging environment (https://staging.dauth.me), using the `mytest` realm and the `myclient` client.

# Step by step guide
To run this properly, you'll need:
1. A build environment with either Docker or NPM/Node (no need for both).
2. A TideCloak environment (currently set to `staging`).

## Configuration
This step is required only if you don't want to use the defaults.
Edit the `src/App.js` file and change:
- `url:` Set it to the base URL of the TideCloak server
- `realm:` Set it to the required realm as set in TideCloak
- `clientId:` Set it to the required client as set in TideCloak
- `redirectUri:` There are 3 of those. 1 is pointing to the base URL of where this ReactJS app is going to run. The other 2 are for the `URL/code` path in that URL. You'll see for yourself.

## Running in a Docker
In this folder, build the docker environment:
``` shell
sudo docker build . -t tc-react
```
Then, run that docker:
``` shell
sudo docker run -d --name TC-React --rm -p 6001:3000 tc-react
```
You can check to see the docker is running by `sudo docker logs TC-React`

## Playing
Once you have the environment up, you'll be able to access the test page on http://localhost:6001

# Bonus addition
This repo (and associated Docker) includes a 2nd, independant, Javascript client.
This independant client is an example of using TideCloak in a single page Javascript (not ReactJS).
Its source code (and where you can change the configuration) is under the `new` folder.
When the Docker is running, the test page for that client is on http://localhost:6001/new/index.htm
