
var editor = {};

editor.setup = () =>{
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  return editor;
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

editor.inserCode = (textToInject, editor) =>{
  // Reloads the code inside the editor erasing all content
  editor.setValue(textToInject);
  return editor;
}


editor.sendEvent = (eventName, eventDetail = '') =>{
  var ev = new CustomEvent(eventName, {
    'detail': eventDetail
  });
  document.dispatchEvent(ev);
}


module.exports = editor;
