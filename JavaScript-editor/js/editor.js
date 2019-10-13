import editor from './editor-methods.js'

var editorRobot1 = 'a-pibot';
var editorRobot2 = 'alvaro-robot'


$(document).ready(async ()=>{
  editor.setup();
  
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
    var myRobot = Websim.robots.getHalAPI(editorRobot1);

    if (editor.threadExists(editorRobot1)){
      if (editor.isThreadRunning(editorRobot1)){
        editor.stopBrain(editorRobot1);
      }else{
        editor.resumeBrain(myRobot, editorRobot1);
      }
    }else{
      editor.runBrain(myRobot, editorRobot1);
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
  await Websim.config.init('../assets/config/config.json');

  setInterval(editor.showThreads, 1000);
});