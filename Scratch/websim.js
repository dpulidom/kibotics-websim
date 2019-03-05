import 'aframe';
import 'aframe-extras';
import 'aframe-physics-system';
import RobotI from './js/interfacesRobot.js';
import {spectObject} from './js/spectatorComponent.js';
import {intersectionHandlerObj} from './js/intersectionHandlerComponent.js';
import {followBodyObj} from './js/followBodyComponent.js';
import {startStopCode} from './js/websim-world-controller.js';
import $ from 'jquery';
// export for others scripts to use
window.$ = $;
//Websim variables
var myRobot;
var play = false;
var reservedVariables = ['myRobot,', 'mainInterval,', 'myRobot;', 'mainInterval;'];
var mainInterval;
var argument, getCodeFunction;

// Register 3 AFRAME components
AFRAME.registerComponent('spectator', spectObject);
AFRAME.registerComponent("intersection-handler", intersectionHandlerObj);
AFRAME.registerComponent("follow-body", followBodyObj);

// Declare an event listener for body-loaded and then creates robot object.
document.addEventListener('body-loaded', (bodyLoaded)=>{ // No se lanza porque no puedo usar el sistema de fisicas

  if(bodyLoaded.target.id == "a-pibot"){
    console.log("------Robot body loaded, creating myRobot instance------")
    myRobot = new RobotI('a-pibot');
  }
});

//Declares a listener, listen to code generated for the editor
document.addEventListener('code-to-run', (event)=>{
  var codeContent = event.detail['code'];
  var jsonOutput = startStopCode(play, myRobot, reservedVariables, mainInterval, codeContent);

  play = jsonOutput["play"];
  mainInterval = jsonOutput["mainInterval"];
});

// Declare a listener to listen reset signal from UI
document.addEventListener('reset', (event)=>{
  var codeContent = `
  myRobot.move(0, 0);
  myRobot.resetRobot();
  `
  // This loop is necesary to first stop the current code execution, execute reset code and then stop it again to receive
  // the new code from user
  for(var i = 0; i<3; i++){
    var jsonOutput = null;
    if (i == 1){
      jsonOutput = startStopCode(play, myRobot, reservedVariables, mainInterval, codeContent);
    }else{
      jsonOutput = startStopCode(play, myRobot, reservedVariables, mainInterval, "");
    }
    play = jsonOutput["play"];
    mainInterval = jsonOutput["mainInterval"];
  }
});

// Auxiliar function to implement a throttle of code.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
