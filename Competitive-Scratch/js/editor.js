import editor from './editor-methods.js'
import brains from '../../brains/brains-methods.js'
import evaluators from '../../brains/evaluators-methods.js'
import agents from '../../brains/agents-methods.js'
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
import initTakeOffBlock from '../customBlocks/takeOffBlock.js'
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
var robIDs = ['',''];
var agentsIDs = [];
for (var robot in f.robots_config) {
  if (f.robots_config[robot].controller == 'user1') {
    robIDs[0] = f.robots_config[robot].id;
  } else if (f.robots_config[robot].controller == 'user2') {
    robIDs[1] = f.robots_config[robot].id;
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
console.log("users: " + robIDs);
console.log("agents: " + agentsIDs);

var editorRobot1 = robIDs[0];
var editorRobot2 = robIDs[1];

// Editor Control Variables for each Robot
var codeFirst = {
  js:"",
  xml:null,
  edit:true
};

var codeSecond = {
  js:"",
  xml: null,
  edit: false
};

$(document).ready(async ()=>{
  configureCustomBlocks();
  editor.setup();

  $("#cambtn").click(()=>{
    editor.toggleCamera();
  });

  $("#spectatorCamera").click(()=>{
    editor.sendEvent("spectator");
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

    if (codeFirst.edit) {
        // Store the current code (XML). Necessary to avoid var names collisions.
        codeFirst.xml = editor.storeCode(editor.ui, codeFirst.edit, codeSecond.edit);
        // Injects and gets Code of the second user
        editor.ui = editor.injectCode(editor.ui,codeSecond.xml);
        codeSecond.js = editor.getCode();
        // Injects and gets Code of the first user, so that the state of the editor
        // remains the same
        editor.ui = editor.injectCode(editor.ui,codeFirst.xml);
        codeFirst.js = editor.getCode();
    } else {
        codeSecond.xml = editor.storeCode(editor.ui, codeFirst.edit, codeSecond.edit);
        editor.ui = editor.injectCode(editor.ui,codeFirst.xml);
        codeFirst.js = editor.getCode();
        editor.ui = editor.injectCode(editor.ui,codeSecond.xml);
        codeSecond.js = editor.getCode();
    }
    console.log(codeFirst);
    console.log(codeSecond);

    if (brains.threadExists(editorRobot1)){
      if (brains.isThreadRunning(editorRobot1)){
        brains.stopBrain(editorRobot1);
        brains.stopBrain(editorRobot2);
        for (var agent in agentsIDs) {
          agents.stopAgent(agentsIDs[agent][0]);
        }
      }else{
        brains.resumeBrain(editorRobot1,codeFirst.js);
        brains.resumeBrain(editorRobot2,codeSecond.js);
        for (var agent in agentsIDs) {
          agents.resumeAgent(agentsIDs[agent][0], agentsIDs[agent][1]);
        }
      }
    }else{
      brains.runBrain(editorRobot1,codeFirst.js);
      brains.runBrain(editorRobot2,codeSecond.js);
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

  document.querySelector("#firstRobot").style.background = '#5addf1';
  $('#firstRobot').click(()=>{
    if(codeFirst.edit){
      codeFirst.xml = editor.storeCode(editor.ui, codeFirst.edit, codeSecond.edit);
      editor.ui = editor.injectCode(editor.ui, codeFirst.xml);
    }
    if(codeSecond.edit){
      codeSecond.xml = editor.storeCode(editor.ui, codeFirst.edit, codeSecond.edit);
      codeSecond.edit = false;
      if(codeFirst.xml == null){
        editor.ui = editor.injectCode(editor.ui, '<xml></xml>');
      } else{
        editor.ui = editor.injectCode(editor.ui, codeFirst.xml);
      }
    }
    codeFirst.edit = true;
    document.querySelector("#firstRobot").style.background = '#5addf1';
    document.querySelector("#secondRobot").style.background = '#e6e6e6';
  });

  $('#secondRobot').click(()=>{
    if(codeSecond.edit){
      codeSecond.xml = editor.storeCode(editor.ui, codeFirst.edit, codeSecond.edit);
      editor.ui = editor.injectCode(editor.ui, codeSecond.xml);
    }
    if(codeFirst.edit){
      codeFirst.xml = editor.storeCode(editor.ui, codeFirst.edit, codeSecond.edit);
      codeFirst.edit = false;
      if(codeSecond.xml == null){
        editor.ui = editor.injectCode(editor.ui, '<xml></xml>');
      } else{
        editor.ui = editor.injectCode(editor.ui, codeSecond.xml);
      }
    }
    codeSecond.edit = true;
    document.querySelector("#secondRobot").style.background = '#5addf1';
    document.querySelector("#firstRobot").style.background = '#e6e6e6';
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
    var robots_list = [];
    for (var r in robIDs) {
      robots_list.push(robIDs[r]);
    }
    for (var a in agentsIDs) {
      robots_list.push(agentsIDs[a][0]);
    }
    evaluators.runEvaluator(robots_list,config_evaluator);
  }
  //setInterval(brains.showThreads, 1000);
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
  initTakeOffBlock();
  initLandBlock();
  initStartBlock();
  initMoveBackwardToBlock();
  initMoveForwardToBlock();
  initTurnLeftToBlock();
  initTurnRightToBlock();
  initGetImageOfBlock();
}
