
# WebSim repository

Web robot simulator using A-Frame technologies.

The project directory structure contains:

## simcore
The AFrame core of the simulator, it includes Aframe components, JS programming interfaces for the supported robots (their HAL-API, Hardware Abstraction Layer).

## assets
World files, configuration files, images...

## JavaScript
A webpage for programming of WebSim robots locally in JS, using the ACE editor and a local node or python webserver.

Under the directory all ACE Editor config files are included.

## Scratch
A webpage for programming of WebSim robots locally in Scratch using the blockly editor and a local node or python webserver. In addition it hosts the use of WebSim from the Django webserver of KiBotics. It also includes the Scratch2JS converstion (using blocky) and the Scratch2Python conversion (using blocky).

Under the directory all Scratch config files and custom block files are included.

## teleoperation
Several webpages to graphically teleoperate the supported robots and see their instantaneous sensor values. One for PiBot, one for Tello drone...


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project needs the following installations.

- [NodeJS](https://nodejs.org/es/download/)
- NPM
- Web browser, [Firefox](https://www.mozilla.org/es-ES/firefox/new/) recommended.

### Installing for development

First clone this repository on your local machine with the following command:

``` git
git clone https://github.com/jderobot-hub/kibotics-websim
```

Once copied to your local machine in terminal run:

``` bash
cd kibotics-websim/simcore
ls
```

`ls` command will show the following files and directories:

```bash
aframe-components
websim.js
interfacesRobot.js
package.json
webpack.config.js
websim-world-controller.js
```

At this point run the following command to install all dependencies for development:

``` npm
npm install
```

If the above command fails, check that you have `nodejs` and `node-gyp` installed. To install it type:

```bash
sudo apt-get install nodejs-dev node-gyp libssl1.0-dev
sudo apt-get install npm
```

This will create `package-lock.json` file and `node_modules` on current directory. If there are no errors in the installation all dependencies are ready for local development.


### Running project

To test the application Python is needed on local machine to use internal HTTP server module. If not installed go to [Install python 3](https://realpython.com/installing-python/). If Python 3 already installed go to **project root** directory and run:

``` python
python -m http.server <port>
```

Where `<port>` is unused port in local machine, `8000` by default. Command output looks:

```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)
```

Then go to web browser and write the URL [`http://0.0.0.0:8000/`](). Two application exists `JavaScript` and `Scratch` applications with the following URLs [`http://0.0.0.0:8000/JavaScript`]() and [`http://0.0.0.0:8000/Scratch`]().



