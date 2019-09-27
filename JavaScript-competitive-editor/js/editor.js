import editor from './editor-methods.js'

var editorRobot = 'a-pibot';

$(document).ready(async ()=>{
  editor.ui = editor.setup();

  $("#cambtn").click(()=>{
    editor.toggleCamera();
  });

  $("#runbtn").click(()=>{
    Websim.robots.executeCode(editorRobot, 'myRobot.setV(1);')
  });

  $('#resetRobot').click(()=>{
    editor.sendEvent('reset');
  });

  // This line executes a function to preconfigure Websim
  await Websim.config.init('../assets/config/config-duo.json');
  var myRobot = Websim.robots.getRobotCopy('a-pibot');
  console.log(myRobot);
  myRobot.setV(0.3);
});
