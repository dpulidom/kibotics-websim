import {setupBlockly, toggleCameraDisplay, saveCode, injectCode, WebSocketConnection, downloadZip} from './js/editor-methods.js'
import initGetAngularSpeedBlock from './js/customBlocks/getAngularSpeedBlock.js'
import initConsoleLogBlock from './js/customBlocks/consoleLogBlock.js'
import initGetDistanceBlock from './js/customBlocks/getDistanceBlock.js'
import initGetDistancesBlock from './js/customBlocks/getDistancesBlock.js'
import initGetImageBlock from './js/customBlocks/getImageBlock.js'
import initGetLateralSpeed from './js/customBlocks/getLateralSpeedBlock.js'
import initGetLinearSpeedBlock from './js/customBlocks/getLinearSpeedBlock.js'
import initGetObjectColorBlock from './js/customBlocks/getObjectColorBlock.js'
import initGetPositionBlock from './js/customBlocks/getPositionBlock.js'
import initGetRotationBlock from './js/customBlocks/getRotationBlock.js'
import initMoveBackwardBlock from './js/customBlocks/moveBackwardBlock.js'
import initMoveBlock from './js/customBlocks/moveBlock.js'
import initMoveForwardBlock from './js/customBlocks/moveForwardBlock.js'
import initPrintOnCanvasBlock from './js/customBlocks/printImgCanvasBlock.js'
import initReadIRBlock from './js/customBlocks/readIRBlock.js'
import initSetIntervalBlock from './js/customBlocks/setIntervalBlock.js'
import initSetTimeoutBlock from './js/customBlocks/setTimeoutBlock.js'
import initSetLateralSpeedBlock from './js/customBlocks/setLateralSpeedBlock.js'
import initStopBlock from './js/customBlocks/stopBlock.js'
import initTurnLeftBlock from './js/customBlocks/turnLeftBlock.js'
import initTurnRightBlock from './js/customBlocks/turnRightBlock.js'
import initWaitBlock from './js/customBlocks/waitBlock.js'
import $ from 'jquery';

var demoWorkspace = "";
// Load enviroment variables defined in the html template
var wsUri = window.wsUri
console.log("-----===================---------------------------------")
console.log("@@@@@@@@@" + wsUri)
console.log("----------------------===========----------------")

var userCode = window.userCode
var socket = ""

$(document).ready(()=>{
  configureCustomBlocks();

  demoWorkspace = setupBlockly(demoWorkspace); // Sets up blockly editor
  demoWorkspace = injectCode(demoWorkspace, userCode); // Inject (Load) blockly user code in editor

  // Toggle display when cambtn clicked
  $("#cambtn").click(()=>{
    toggleCameraDisplay();
  });

  $('#generator').click(()=>{
    showMe(demoWorkspace);
  });

  $('#runbtn').click(()=>{
    var codeString = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    var websimevent = new CustomEvent('code-to-run', {
      'detail': {
        'code': codeString
      }
    });
    document.dispatchEvent(websimevent);
  });

  $("#injectCode").click(()=>{
    demoWorkspace = injectCode(demoWorkspace, userCode);
  });
  
  $("#saveCode").click(()=>{
    saveCode(demoWorkspace, socket); // Declare function that extracts code from editor and sends to server via connection.send
  });








  $("#blocklyToPython").click(()=>{
    downloadZip(demoWorkspace, socket);
  });








  
  $('#resetRobot').click(()=>{
    var resetEvent = new CustomEvent('reset', {
      'detail': ''
    });
    document.dispatchEvent(resetEvent);
  });

  // Only should try connect to Ws Server if wsUri is not null. Its necesary for avoid error with no registered users
  if (wsUri != null){
    socket = WebSocketConnection(wsUri) // Create WebSocket connection with server to save system
  }
  
});

function configureCustomBlocks(){
  initGetAngularSpeedBlock();
  initConsoleLogBlock();
  initGetDistanceBlock();
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
}
