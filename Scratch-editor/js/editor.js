import editor from './editor-methods.js'
import brains from '../../brains/brains-methods.js'
import evaluators from '../../brains/evaluators-methods.js'
import initGetAngularSpeedBlock from '../customBlocks/getAngularSpeedBlock.js'
import initConsoleLogBlock from '../customBlocks/consoleLogBlock.js'
import initGetDistanceBlock from '../customBlocks/getDistanceBlock.js'
import initGetDistancesBlock from '../customBlocks/getDistancesBlock.js'
import initGetImageBlock from '../customBlocks/getImageBlock.js'
import initGetLateralSpeed from '../customBlocks/getLateralSpeedBlock.js'
import initGetLinearSpeedBlock from '../customBlocks/getLinearSpeedBlock.js'
import initGetObjectColorBlock from '../customBlocks/getObjectColorBlock.js'
import initGetPositionBlock from '../customBlocks/getPositionBlock.js'
import initGetRotationBlock from '../customBlocks/getRotationBlock.js'
import initMoveBackwardBlock from '../customBlocks/moveBackwardBlock.js'
import initMoveBlock from '../customBlocks/moveBlock.js'
import initMoveForwardBlock from '../customBlocks/moveForwardBlock.js'
import initPrintOnCanvasBlock from '../customBlocks/printImgCanvasBlock.js'
import initReadIRBlock from '../customBlocks/readIRBlock.js'
import initSetIntervalBlock from '../customBlocks/setIntervalBlock.js'
import initSetTimeoutBlock from '../customBlocks/setTimeoutBlock.js'
import initSetLateralSpeedBlock from '../customBlocks/setLateralSpeedBlock.js'
import initStopBlock from '../customBlocks/stopBlock.js'
import initTurnLeftBlock from '../customBlocks/turnLeftBlock.js'
import initTurnRightBlock from '../customBlocks/turnRightBlock.js'
import initWaitBlock from '../customBlocks/waitBlock.js'
import initRobotInstanceBlock from '../customBlocks/robotInstanceBlock.js'
import initTakeoffBlock from '../customBlocks/takeoffBlock.js'
import initLandBlock from '../customBlocks/landBlock.js'
import initStartBlock from '../customBlocks/startBlock.js'
import initMoveBackwardToBlock from '../customBlocks/moveBackwardToBlock.js'
import initMoveForwardToBlock from '../customBlocks/moveForwardToBlock.js'
import initTurnLeftToBlock from '../customBlocks/turnLeftToBlock.js'
import initTurnRightToBlock from '../customBlocks/turnRightToBlock.js'
import initGetImageOfBlock from '../customBlocks/getImageOfBlock.js'

// Load enviroment variables defined in the html template
var wsUri = window.wsUri;
console.log("-----===================---------------------------------");
console.log("@@@@@@@@@" + wsUri);
console.log("----------------------===========----------------");

//var userCode = window.userCode;
var socket = "";

// parse robots config
var r = new XMLHttpRequest();
r.overrideMimeType("application/json");
r.open('GET', config_file, false);
r.send(null);
if (r.status == 200){
  var f = JSON.parse(r.responseText);
}
// Identify robot ID for the user and each agent
var robID;
var agentsIDs = [];
for (var robot in f.robots_config) {
  if (f.robots_config[robot].controller == 'user1') {
    robID = f.robots_config[robot].id;
  } else if (f.robots_config[robot].controller == 'agent') {
    agentsIDs.push([f.robots_config[robot].id, f.robots_config[robot].code]);
  }
}
console.log("user: " + robID);
console.log("agents: " + agentsIDs);

var editorRobot1 = robID; //id del robot (fichero json)

$(document).ready(async ()=>{
  configureCustomBlocks();
  editor.setup();


  // Toggle display when cambtn clicked
  $("#cambtn").click(()=>{
    editor.toggleCamera();
  });

  $("#spectatorCamera").click(()=>{
    editor.changeSpectatorCamera(); //cambiar a editor.changeSpectatorCamera porque ya no hay import
  });

  $("#runbtn").click(()=>{
    /**
     * Function to execute when run button clicked, multiple options
     * supported:
     * - Creates thread for a robot if not exists and runs
     * - Stop thread for a robot if exists and running
     * - Resume thread for a robot if exists and not running
     */
    var iconRunBtn = document.querySelector("#runbtn").firstChild;
    if ($(iconRunBtn).hasClass("glyphicon-stop")){
        iconRunBtn.classList.remove("glyphicon-stop");
        iconRunBtn.classList.add("glyphicon-play");
        document.querySelector("#runbtn").innerHTML = document.querySelector("#runbtn").innerHTML.replace('Pausar Código', 'Ejecutar Código');
    } else {
        iconRunBtn.classList.remove("glyphicon-play");
        iconRunBtn.classList.add("glyphicon-stop");
        document.querySelector("#runbtn").innerHTML = document.querySelector("#runbtn").innerHTML.replace('Ejecutar Código','Pausar Código');
    }

    var code = editor.getCode()
    console.log(code);
    if (brains.threadExists(editorRobot1)){
      if (brains.isThreadRunning(editorRobot1)){
        brains.stopBrain(editorRobot1);
      } else {
        brains.resumeBrain(editorRobot1,code);
      }
    }else{
      brains.runBrain(editorRobot1,code);
    }
  });

  $("#saveCode").click(()=>{
    editor.saveCode(editor.ui, socket); // Declare function that extracts code from editor and sends to server via connection.send
  });

  $("#blocklyToPython").click(()=>{
    editor.downloadZip(editor.ui, socket);
  });

  $('#resetRobot').click(()=>{
    editor.sendEvent('reset');
  });

  $('#simButton').click(()=>{
    var imageSimBtn = document.querySelector("#simButton").firstChild;
    Websim.simulation.toggleSimulation();

    if(imageSimBtn.src.indexOf('play-icon.png') == -1){
      imageSimBtn.src = play_icon;
      document.querySelector("#simButton").innerHTML = document.querySelector("#simButton").innerHTML.replace('Pausar Simulación', 'Reanudar Simulación');
    }else{
      imageSimBtn.src = stop_icon;
      document.querySelector("#simButton").innerHTML = document.querySelector("#simButton").innerHTML.replace('Reanudar Simulación','Pausar Simulación');
    }
  });

  // Only should try connect to Ws Server if wsUri is not null. Its necesary for avoiding error with no registered users
  if (wsUri != null){
    socket = wsocket; // declared in WebServer Template
    if (socket.readyState == WebSocket.OPEN) {
      document.getElementById("saveCode").disabled = false;
      socket.onclose = function (evt) {
        console.error(evt.data);
        console.log("Cierre de conexión WebSockets detectado. Intentando Reconectar.")
        document.getElementById("saveCode").disabled = true
        setTimeout(function() {
          socket = editor.WebSocketConnection(wsUri);
        },500);
      };
    } else {
      socket = editor.WebSocketConnection(wsUri); // Create WebSocket connection with server to save system
    }
  }

  // Init Websim simulator with config contained in the file passed
  // as parameter
  await Websim.config.init(config_file);
  if(typeof config_evaluator!=="undefined"){
    evaluators.runEvaluator([editorRobot1],config_evaluator);
  }
  //setInterval(editor.showThreads, 1000);
});

function configureCustomBlocks() {
  initGetAngularSpeedBlock();
  initConsoleLogBlock();
  initGetDistanceBlock();
  initRobotInstanceBlock();
  initGetDistancesBlock();
  initGetImageBlock();
  initGetLateralSpeed();
  initGetLinearSpeedBlock();
  initGetObjectColorBlock();
  initGetPositionBlock();
  initGetRotationBlock();
  initMoveBackwardBlock();
  initMoveBlock();
  initMoveForwardBlock();
  initPrintOnCanvasBlock();
  initReadIRBlock();
  initSetIntervalBlock();
  initSetTimeoutBlock();
  initStopBlock();
  initTurnLeftBlock();
  initTurnRightBlock();
  initWaitBlock();
  initSetLateralSpeedBlock();
  initTakeoffBlock();
  initLandBlock();
  initStartBlock();
  initMoveBackwardToBlock();
  initMoveForwardToBlock();
  initTurnLeftToBlock();
  initTurnRightToBlock();
  initGetImageOfBlock();
}
