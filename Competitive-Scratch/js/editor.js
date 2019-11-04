import editor from './editor-methods.js'
import brains from '../../brains/brains-methods.js'
import {runEvaluator} from '../../brains/evaluator-methods.js'
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


// parse A-Frame config
var r = new XMLHttpRequest();
r.overrideMimeType("application/json");
r.open('GET', config_file, false);
r.send(null);
if (r.status == 200){
  var f = JSON.parse(r.responseText);
}
// Identify multiple robot IDs
var robIDs = [];
for (var obj in f.objects) {
    if (f.objects[obj].tag == 'a-robot') {
        robIDs.push(f.objects[obj].attr.id);
    }
}

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
        codeFirst.xml = editor.storeCode(editor.ui);
        // Injects and gets Code of the second user
        editor.ui = editor.injectCode(editor.ui,codeSecond.xml);
        codeSecond.js = editor.getCode();
        // Injects and gets Code of the first user, so that the state of the editor
        // remains the same
        editor.ui = editor.injectCode(editor.ui,codeFirst.xml);
        codeFirst.js = editor.getCode();
    } else {
        codeSecond.xml = editor.storeCode(editor.ui);
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
      }else{
        brains.resumeScratchBrain(editorRobot1,codeFirst.js);
        brains.resumeScratchBrain(editorRobot2,codeSecond.js);
      }
    }else{
      brains.runScratchBrain(editorRobot1,codeFirst.js);
      brains.runScratchBrain(editorRobot2,codeSecond.js);
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
      codeFirst.xml = editor.storeCode(editor.ui);
      editor.ui = editor.injectCode(editor.ui, codeFirst.xml);
    }
    if(codeSecond.edit){
      codeSecond.xml = editor.storeCode(editor.ui);
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
      codeSecond.xml = editor.storeCode(editor.ui);
      editor.ui = editor.injectCode(editor.ui, codeSecond.xml);
    }
    if(codeFirst.edit){
      codeFirst.xml = editor.storeCode(editor.ui);
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
      imageSimBtn.src = "../../assets/resources/play-icon.png"
      document.querySelector("#simButton").innerHTML = document.querySelector("#simButton").innerHTML.replace('Pausar Simulación', 'Reanudar Simulación');
    }else{
      imageSimBtn.src = "../../assets/resources/stop-icon.png"
      document.querySelector("#simButton").innerHTML = document.querySelector("#simButton").innerHTML.replace('Reanudar Simulación','Pausar Simulación');
    }
  });

   // Only should try connect to Ws Server if wsUri is not null. Its necesary for avoid error with no registered users
  if (wsUri != null){
    socket = editor.WebSocketConnection(wsUri) // Create WebSocket connection with server to save system
  }

  // Init Websim simulator with config contained in the file passed
  // as parameter
  await Websim.config.init(config_file);
  if(typeof config_evaluator!=="undefined"){
    runEvaluator([editorRobot1,editorRobot2],config_evaluator);
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
  initTakeoffBlock();
  initLandBlock();
  initStartBlock();
  initMoveBackwardToBlock();
  initMoveForwardToBlock();
  initTurnLeftToBlock();
  initTurnRightToBlock();
  initGetImageOfBlock();
}
