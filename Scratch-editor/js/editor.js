import editor from './editor-methods.js'
import brains from '../../brains/brains-methods.js'
import evaluators from '../../brains/evaluators-methods.js'
import agents from '../../brains/agents-methods.js'
import initGetAngularSpeedBlock from '../../scratch-drivers/customBlocks/getAngularSpeedBlock.js'
import initConsoleLogBlock from '../../scratch-drivers/customBlocks/consoleLogBlock.js'
import initGetDistanceBlock from '../../scratch-drivers/customBlocks/getDistanceBlock.js'
import initGetDistancesBlock from '../../scratch-drivers/customBlocks/getDistancesBlock.js'
import initGetImageBlock from '../../scratch-drivers/customBlocks/getImageBlock.js'
import initGetLateralSpeed from '../../scratch-drivers/customBlocks/getLateralSpeedBlock.js'
import initGetLinearSpeedBlock from '../../scratch-drivers/customBlocks/getLinearSpeedBlock.js'
import initGetObjectColorBlock from '../../scratch-drivers/customBlocks/getObjectColorBlock.js'
import initGetPositionBlock from '../../scratch-drivers/customBlocks/getPositionBlock.js'
import initGetRotationBlock from '../../scratch-drivers/customBlocks/getRotationBlock.js'
import initMoveBackwardBlock from '../../scratch-drivers/customBlocks/moveBackwardBlock.js'
import initGetObjectColorRGB from '../../scratch-drivers/customBlocks/getObjectColorRgbBlock.js'
import initMoveBlock from '../../scratch-drivers/customBlocks/moveBlock.js'
import initMoveAllBlock from '../../scratch-drivers/customBlocks/moveAllBlock.js'
import initMoveForwardBlock from '../../scratch-drivers/customBlocks/moveForwardBlock.js'
import initPrintOnCanvasBlock from '../../scratch-drivers/customBlocks/printImgCanvasBlock.js'
import initReadIRBlock from '../../scratch-drivers/customBlocks/readIRBlock.js'
import initSetIntervalBlock from '../../scratch-drivers/customBlocks/setIntervalBlock.js'
import initSetTimeoutBlock from '../../scratch-drivers/customBlocks/setTimeoutBlock.js'
import initSetLateralSpeedBlock from '../../scratch-drivers/customBlocks/setLateralSpeedBlock.js'
import initStopBlock from '../../scratch-drivers/customBlocks/stopBlock.js'
import initTurnLeftBlock from '../../scratch-drivers/customBlocks/turnLeftBlock.js'
import initTurnRightBlock from '../../scratch-drivers/customBlocks/turnRightBlock.js'
import initWaitBlock from '../../scratch-drivers/customBlocks/waitBlock.js'
import initRobotInstanceBlock from '../../scratch-drivers/customBlocks/robotInstanceBlock.js'
import initTakeOffBlock from '../../scratch-drivers/customBlocks/takeOffBlock.js'
import initLandBlock from '../../scratch-drivers/customBlocks/landBlock.js'
import initStartBlock from '../../scratch-drivers/customBlocks/startBlock.js'
import initMoveBackwardToBlock from '../../scratch-drivers/customBlocks/moveBackwardToBlock.js'
import initMoveForwardToBlock from '../../scratch-drivers/customBlocks/moveForwardToBlock.js'
import initTurnLeftToBlock from '../../scratch-drivers/customBlocks/turnLeftToBlock.js'
import initTurnRightToBlock from '../../scratch-drivers/customBlocks/turnRightToBlock.js'
import initGetImageOfBlock from '../../scratch-drivers/customBlocks/getImageOfBlock.js'

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
    var js_content;
    var request = new XMLHttpRequest();
    request.open("GET", f.robots_config[robot].code, false);
    request.onreadystatechange = function () {
      if(request.status === 200 || request.status == 0) {
          js_content = request.responseText;
      }
    }
    request.send(null);
    agentsIDs.push([f.robots_config[robot].id, js_content]);
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

    var code = editor.getCode();
    console.log(code);
    if (brains.threadExists(editorRobot1)){
      if (brains.isThreadRunning(editorRobot1)){
        brains.stopBrain(editorRobot1);
        for (var agent in agentsIDs) {
          agents.stopAgent(agentsIDs[agent][0]);
        }
      } else {
        brains.resumeBrain(editorRobot1,code);
        for (var agent in agentsIDs) {
          agents.resumeAgent(agentsIDs[agent][0], agentsIDs[agent][1]);
        }
      }
    }else{
      brains.runBrain(editorRobot1,code);
      //brains.runWorkerBrain(editorRobot1,code);
      for (var agent in agentsIDs) {
        agents.runAgent(agentsIDs[agent][0], agentsIDs[agent][1]);
      }
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
        console.log("Cierre de conexión WebSockets detectado.")
        document.getElementById("saveCode").disabled = true
      };
    } else {
      socket = editor.WebSocketConnection(wsUri); // Create WebSocket connection with server to save system
    }
  }

  // Init Websim simulator with config contained in the file passed
  // as parameter
  await Websim.config.init(config_file);
  if(typeof config_evaluator!=="undefined"){
    var robots_list = [];
    robots_list.push(robID);
    for (var a in agentsIDs) {
      robots_list.push(agentsIDs[a][0]);
    }
    evaluators.runEvaluator(robots_list,config_evaluator);
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
  initMoveAllBlock();
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
  initTakeOffBlock();
  initLandBlock();
  initStartBlock();
  initMoveBackwardToBlock();
  initMoveForwardToBlock();
  initTurnLeftToBlock();
  initTurnRightToBlock();
  initGetImageOfBlock();
  initGetObjectColorRGB();
}
