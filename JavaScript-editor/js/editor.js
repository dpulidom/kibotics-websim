import editor from './editor-methods.js'
import brains from '../../brains/brains-methods.js'
import evaluators from '../../brains/evaluators-methods.js'
import {arrayBrainsStatus} from '../../simcore/globals';

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
    //console.log(code);
    //if(typeof(brains.w) !="undefined"){
    if (brains.threadExists(editorRobot1)){
      Websim.simulation.toggleSimulation();
      //brains.stopWorker(editorRobot1);
      if (brains.isThreadRunning(editorRobot1)){
        brains.pauseBrain(editorRobot1);
        //console.log(arrayBrainsStatus);
        //brains.stopBrain(editorRobot1);
      }else{
        brains.resumeBrain(editorRobot1,code);
      }
    }else{
      arrayBrainsStatus.push({id:editorRobot1,status:"RUNNING",blocking_instruction:false});
      brains.runBrain(editorRobot1,code);
      //brains.runWorkerBrain(editorRobot1,code);
      var runbtn = document.querySelector("#runbtn").firstChild;
      runbtn.src ="../assets/resources/stop-icon.png";
    }
  });

  $('#resetRobot').click(()=>{
    editor.sendEvent('reset');
  });

  // $('#simButton').click(()=>{
  //   Websim.simulation.toggleSimulation();
  // });

  // Init Websim simulator with config contained in the file passed
  // as parameter
  await Websim.config.init(config_file);
  if(typeof config_evaluator!=="undefined"){
    evaluators.runEvaluator([editorRobot1],config_evaluator);
  }
});
