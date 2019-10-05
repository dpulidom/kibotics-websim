import 'aframe';
import 'aframe-extras';
import 'aframe-physics-system';
import RobotI from './interfacesRobot.js';
import {spectObject} from './aframe-components/spectatorComponent.js';
import {intersectionHandlerObj} from './aframe-components/intersectionHandlerComponent.js';
import {followBodyObj} from './aframe-components/followBodyComponent.js';
import {startStopCode} from './websim-world-controller.js';
import $ from 'jquery';
import uuidv4 from 'uuid/v4';

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
    myRobot = new RobotI('a-pibot', uuidv4());
  }
});

//Declares a listener, listen to code generated for the editor
document.addEventListener('code-to-run', (event)=>{
  var codeContent = "async function myAlgorithm(){\n"+event.detail['code']+"}\n myAlgorithm();";
  var jsonOutput = startStopCode(play, myRobot, reservedVariables, mainInterval, codeContent);

  play = jsonOutput["play"];
  mainInterval = jsonOutput["mainInterval"];
});

document.addEventListener('spectatorCamera',(event)=>{
  var opencvCam = document.querySelector("#spectatorDiv");
  var subjCamera = document.querySelector("#subjCamera");
  var spectatorCamera = document.querySelector("#primaryCamera");
  var firstPersonCamera = document.querySelector("#cameraRobot");
  // var cameraRobot = document.querySelector("#cameraRobot");
  var camera1 = subjCamera.getAttribute('camera','active');
  var camera2 = spectatorCamera.getAttribute('camera','active');
  var camera3 = firstPersonCamera.getAttribute('camera','active');
  console.log(firstPersonCamera);
  console.log(opencvCam);
  if(camera1.active===true){
    spectatorCamera.setAttribute('camera', 'active', true);
  }else if(camera2.active===true){
    firstPersonCamera.setAttribute('camera', 'active', true);
  }else if(camera3.active==true){
    subjCamera.setAttribute('camera', 'active', true);
  }
  console.log(opencvCam);
  console.log(firstPersonCamera);
  myRobot.startCamera();
})

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
