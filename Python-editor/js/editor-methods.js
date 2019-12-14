
var editor = {};

// Used to store current UI context for later use
editor.ui = {};

editor.setup = () =>{
  editor.ui = ace.edit("ace");
  editor.ui.setTheme("ace/theme/monokai");
  editor.ui.session.setMode("ace/mode/python");
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

editor.insertCode = (textToInject) =>{
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
  /**
   * Function that extracts code of the current context
   * of the editor
   */
  return editor.ui.getValue();
}

function sleep2(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = editor;
