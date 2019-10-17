import editor from './editor-methods.js'
import brains from '../../simcore/brains/brains-methods.js'

var editorRobot1 = 'a-car1';
var editorRobot2 = 'a-car2';

var editFirst = true;
var editSecond = false;
var codeFirst = null;
var codeSecond = null;

$(document).ready(async ()=>{
  editor.setup();
  
  $("#spectatorCamera").click(()=>{
    editor.sendEvent("spectator");
  });

  $("#cambtn").click(()=>{
    editor.toggleCamera();
  });

  $("#runbtn").click(()=>{
    /**
     * Function to execute when run button clicked, multiple options
     * supported:
     * - Creates thread for a robot if not exists and runs
     * - Stop thread for a robot if exists and running
     * - Resume thread for a robot if exists and not running
     */
    console.log(codeFirst);
    console.log(codeSecond);
    console.log(brains);

    // var myRobot1 = Websim.robots.getHalAPI(editorRobot1);
    // var myRobot2 = Websim.robots.getHalAPI(editorRobot2);

    if (brains.threadExists(editorRobot1)){
      if (brains.isThreadRunning(editorRobot1)){
        brains.stopBrain(editorRobot1);
        brains.stopBrain(editorRobot2);
      }else{
        brains.resumeBrain(editorRobot1,codeFirst);
        brains.resumeBrain(editorRobot2,codeSecond);
      }
    }else{
      brains.runBrain(editorRobot1,codeFirst);
      brains.runBrain(editorRobot2,codeSecond);
    }
  });

  $('#resetRobot').click(()=>{
    editor.sendEvent('reset');
  });

  $('#firstRobot').click(()=>{
    console.log(codeFirst);
    console.log(codeSecond);
    if(editFirst){
      codeFirst = editor.getCode();
    }
    if(editSecond){
      codeSecond = editor.getCode();
      editSecond=false;
      if(codeFirst==null){
        editor.insertCode("",editor);
        // editor.ui.setValue("");
      }else{
        editor.insertCode(codeFirst,editor);
        // editor.ui.setValue(codeFirst);
      }
    }
    editFirst= true;
  });

  $('#secondRobot').click(()=>{
    console.log(codeFirst);
    console.log(codeSecond);
    if(editSecond){
      codeSecond = editor.getCode();
    }
    if(editFirst){
      codeFirst = editor.getCode();
      editFirst=false;
      if(codeSecond==null){
        console.log("pasa por null", editor);
        editor.insertCode("async function myAlgorithm(){\nmyRobot.move(0.5, 0, 0);\n}",editor);
        // editor.ui.setValue("");
      }else{
        console.log(codeSecond);
        editor.insertCode(codeSecond,editor);
        // editor.ui.setValue(codeSecond);
      }
    }
    editSecond= true;
  });

  $('#simButton').click(()=>{
    Websim.simulation.toggleSimulation();
  });

  // Init Websim simulator with config contained in the file passed
  // as parameter
  await Websim.config.init(config_file);

  // setInterval(brains.showThreads, 1000);
});
