var editFirst = true;
var editSecond = false;
var codeFirst = null;
var codeSecond = null;

var editor = {};

editor.ui = {};

editor.setup = () =>{
  editor.ui = ace.edit("ace");
  editor.ui.setTheme("ace/theme/monokai");
  editor.ui.session.setMode("ace/mode/javascript");
}

editor.toggleCamera = () =>{
    var opencvCam = document.querySelector("#outputCanvas");
    var imageCamBtn = document.querySelector("#cambtn").firstChild;
    $("#outputCanvas, #spectatorDiv").toggle();
    if(opencvCam.style.display != "none"){
      imageCamBtn.src = "../../assets/resources/stop-camera-icon.png"
    }else{
      imageCamBtn.src = "../../assets/resources/play-camera-icon.png"
    }
}

editor.insertCode = (textToInject, editor) =>{
  // Reloads the code inside the editor erasing all content
  editor.ui.setValue(textToInject);
}

editor.sendEvent = (eventName, eventDetail = '') =>{
  var ev = new CustomEvent(eventName, {
    'detail': eventDetail
  });
  document.dispatchEvent(ev);
}

editor.getCode = () =>{
  return editor.ui.getValue();
}

function sleep2(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = editor;
