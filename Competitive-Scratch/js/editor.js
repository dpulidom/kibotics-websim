import editor from './editor-methods.js'
import brains from '../../brains/brains-methods.js'
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


// Load enviroment variables defined in the html template
var wsUri = window.wsUri;
console.log("-----===================---------------------------------");
console.log("@@@@@@@@@" + wsUri);
console.log("----------------------===========----------------");

//var userCode = window.userCode;
var socket = "";

var editorRobot1 = 'a-car1';
var editorRobot2 = 'a-car2';

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
    console.log("EHECUTANDO...");

    // if (codeFirst.edit) {
    //     codefirst.js = editor.getCode();
    //     editor.ui = editor.injectCode(editor.ui,codeSecond);
    //     codeSecond.js = editor.getCode();
    //     editor.ui = editor.injectCode(editor.ui,codeFirst);
    // } else {
    //     codeSecond.js = editor.getCode();
    //     editor.ui = editor.injectCode(editor.ui,codeFirst);
    //     codeFirst.js = editor.getCode();
    //     editor.ui = editor.injectCode(editor.ui,codeSecond);
    // }
    console.log(codeFirst);
    console.log(codeSecond);

    if (brains.threadExists(editorRobot1)){
      if (brains.isThreadRunning(editorRobot1)){
        brains.stopBrain(editorRobot1);
        brains.stopBrain(editorRobot2);
      }else{
        brains.resumeBrain(editorRobot1,codeFirst.js);
        brains.resumeBrain(editorRobot2,codeSecond.js);
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

  $('#firstRobot').click(()=>{
    if(codeFirst.edit){
      codeFirst.js = editor.getCode();
      codeFirst.xml = editor.storeCode(editor.ui);
    }
    if(codeSecond.edit){
      codeSecond.js = editor.getCode();
      codeSecond.xml = editor.storeCode(editor.ui);
      codeSecond.edit =false;
      if(codeFirst.xml!=null){
        //FALLO AL INYECTAR CÓDIGO
        editor = editor.injectCode(editor.ui, codeFirst.xml);
      }
    }
    codeSecond.edit = true;
    console.log(codeFirst);
    console.log(codeSecond);
  });

  $('#secondRobot').click(()=>{
    if(codeSecond.edit){
      codeFirst.js = editor.getCode();
      codeSecond.xml = editor.storeCode(editor.ui);
    }
    if(codeFirst.edit){
      codeFirst.js = editor.getCode();
      codeFirst.xml = editor.storeCode(editor.ui);
      codeFirst.edit=false;
      if(codeSecond.xml!=null){
        //FALLO AL INYECTAR CÓDIGO
        editor.ui = editor.injectCode(editor.ui,codeSecond.xml);
      }
    }
    codeSecond.edit = true;
    console.log(codeFirst);
    console.log(codeSecond);
  });

  $('#simButton').click(()=>{
    Websim.simulation.toggleSimulation();
  });

   // Only should try connect to Ws Server if wsUri is not null. Its necesary for avoid error with no registered users
  if (wsUri != null){
    socket = editor.WebSocketConnection(wsUri) // Create WebSocket connection with server to save system
  }

  // Init Websim simulator with config contained in the file passed
  // as parameter
  await Websim.config.init(config_file);

  setInterval(brains.showThreads, 1000);
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
}
