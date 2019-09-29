import {setupBlockly, toggleCameraDisplay, saveCode, injectCode, WebSocketConnection, downloadZip,changeSpectatorCamera} from './editor-methods.js'
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

var demoWorkspace = "";
// Load enviroment variables defined in the html template
var wsUri = window.wsUri;
console.log("-----===================---------------------------------");
console.log("@@@@@@@@@" + wsUri);
console.log("----------------------===========----------------");

var userCode = window.userCode;
var socket = "";


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
    console.log(codeString)
    var websimevent = new CustomEvent('code-to-run', {
      'detail': {
        'code': codeString
      }
    });
    document.dispatchEvent(websimevent);
  });

  $('#spectatorCamera').click(()=>{
    changeSpectatorCamera();
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
}
