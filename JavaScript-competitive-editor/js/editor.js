import editor from './editor-methods.js'

var car1 = 'a-car1';
var car2 = 'a-car2';

var editFirst = true;
var editSecond = false;
var codeFirst = null;
var codeSecond = null;

$(document).ready(async ()=>{
  editor.ui = editor.setup();

  $("#cambtn").click(()=>{
    editor.toggleCamera();
  });

  $("#runbtn").click(()=>{
    console.log(codeFirst);
    Websim.robots.executeCode(car1, 'myRobot.setV(1);')
    Websim.robots.executeCode(car2, 'myRobot.setV(-1);')

  });

  $('#resetRobot').click(()=>{
    editor.sendEvent('reset');
  });

  $('#firstRobot').click(()=>{
    if(editFirst==true){
      codeFirst = editor.ui.getValue();
    }
    if(editSecond){
      codeSecond = editor.ui.getValue();
      editSecond=false;
      if(codeFirst==null){
        editor.ui.setValue("");
      }else{
        editor.ui.setValue(codeFirst);
      }
    }
    editFirst= true;
  });

  $('#secondRobot').click(()=>{
    if(editSecond==true){
      codeSecond = editor.ui.getValue();
    }
    if(editFirst){
      codeFirst = editor.ui.getValue();
      editFirst=false;
      if(codeSecond==null){
        editor.ui.setValue("");
      }else{
        editor.ui.setValue(codeSecond);
      }
    }
    editSecond= true;
  });

  // This line executes a function to preconfigure Websim
  await Websim.config.init('../assets/config/config-duo.json');
  var myRobot = Websim.robots.getRobotCopy('a-car1');
  var myRobot2 = Websim.robots.getRobotCopy('a-car2');
  console.log(myRobot);
  // myRobot.setV(0.3);
  // myRobot2.setV(-0.3);
});
