import 'aframe';
import 'aframe-extras';
import 'aframe-physics-system';
import $ from 'jquery';
import * as robots from './robots';
import * as simulation from './simulation';
import * as config from './config';
import * as utils from './utils';
import * as globals from './globals';

window.$ = $;

var Websim = {
  globals: globals,
  utils: utils,
  simulation: simulation,
  robots: robots,
  config: config
};

Websim.reservedVariables = ['myRobot,', 'mainInterval,', 'myRobot;', 'mainInterval;'];


Websim.config.init = async (configFile)=>{
  /**
   * This function is used to configure Websim, some
   * functions needs to be executed before anything due to
   * they needs to listen events or extend AFrame components
   * 
   * @param {string} configFile Config file url to request to load scene and robots
   */
  return new Promise(async (resolve, reject) =>{
    Websim.simulation.robotLoader();
    Websim.simulation.extendAFrame();
    Websim.robots.storeRobotID();
    await Websim.config.loadJSON(configFile);
    console.log("Loaded Websim world")
    Websim.config.activateMainCamera();
    resolve();
  });
}


// This line exports websim to be used from other scripts
module.exports = window.Websim = Websim;
