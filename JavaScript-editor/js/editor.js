import editor from './editor-methods.js'
import brains from '../../brains/brains-methods.js'

var editorRobot1 = 'a-pibot';
var editorRobot2 = 'alvaro-robot';

$(document).ready(async ()=>{
  editor.setup();

  $("#cambtn").click(()=>{
    editor.toggleCamera();
  });

  $("#spectatorCamera").click(()=>{
    changeSpectatorCamera();
  });

  $("#runbtn").click(()=>{
    /**
     * Function to execute when run button clicked, multiple options
     * supported:
     * - Creates thread for a robot if not exists and runs
     * - Stop thread for a robot if exists and running
     * - Resume thread for a robot if exists and not running
     */
    var code = editor.getCode()
    console.log(code);
    if (brains.threadExists(editorRobot1)){
      if (brains.isThreadRunning(editorRobot1)){
        brains.stopBrain(editorRobot1);
      }else{
        brains.resumeBrain(editorRobot1,code);
      }
    }else{
      brains.runBrain(editorRobot1,code);
    }
  });

  $('#resetRobot').click(()=>{
    editor.sendEvent('reset');
  });

  $('#simButton').click(()=>{
    Websim.simulation.toggleSimulation();
  });

  // Init Websim simulator with config contained in the file passed
  // as parameter
  await Websim.config.init(config_file);

  //setInterval(brains.showThreads, 1000);
});
