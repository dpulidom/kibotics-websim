import editor from './editor-methods.js'

var canExecute = true;

$(document).ready(async ()=>{
  editor.ui = editor.setup();
  $("#cambtn").click(()=>{
    editor.toggleCamera();
  });

  $("#runbtn").click(()=>{
    if (canExecute){
      updateCode();
    }else{
      canExecute = false;
    }
  });

  $('#resetRobot').click(()=>{
    editor.sendEvent('reset');
  });

  // This line executes a function to preconfigure Websim
  await Websim.config.init('../assets/config/config.json');
  console.log(Websim.globals.arrayRobots.length)
});

function updateCode(){
  if (canExecute){
    dispatchCode();
    setInterval(updateCode, 5000);
  }
}

function dispatchCode(){
  var codeString = editor.ui.getValue();
  var websimevent = new CustomEvent('code-to-run', {
        'detail': {
          'code': codeString
        }
    });
  document.dispatchEvent(websimevent);
}
