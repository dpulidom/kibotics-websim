/*
  This file sets up Blockly and ACE editors and manages their functions.

  This file provide 2 functions:
  - startStopCode: starts or stop the code from blockly workspace.
  - setupBlockly: Initial set up Blockly workspace.
*/

export function setupBlockly(workspace){
/*
  This function sets up Blockly editor.
  It configures toolbox and injects a template
*/
  workspace = Blockly.inject('blockly-div', {
    media: '/static/websim/Scratch/google-blockly/media/',
    //media: 'google-blockly/media/',
    toolbox: document.getElementById('toolbox'),
    zoom:
         {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        },
    trashcan: true,
    horizontalLayout: false,
    scrollbars: true
  });

  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  return workspace;
}

export function toggleCameraDisplay(){
    var opencvCam = document.querySelector("#outputCanvas");
    var imageCamBtn = document.querySelector("#cambtn").firstChild;
    $("#outputCanvas, #spectatorDiv").toggle();
    if(opencvCam.style.display != "none"){
      imageCamBtn.src = "/static/websim/assets/resources/stop-camera-icon.png"
    }else{
      imageCamBtn.src = "/static/websim/assets/resources/play-camera-icon.png"
    }
}

export function injectCode(workspace, xmlCodeText){
  if (xmlCodeText != undefined){
    var xmlToInject = Blockly.Xml.textToDom(xmlCodeText);
    Blockly.Xml.domToWorkspace(xmlToInject, workspace);
    console.log("Code injected into workspace");
  }
  return workspace;
}


export function saveCode(demoWorkspace, socket){
  console.log("Getting code from the embedded editor.")
  var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
  var xml_text = Blockly.Xml.domToText(xml);

  var message = {
      type: "save",
      content: xml_text
  };

  socket.send(JSON.stringify(message));
}



/////////////////// descarga local websim pibot
export function downloadZip(demoWorkspace, socket){
  console.log("Getting code from the embedded editor.")
  var pythonContent = Blockly.Python.workspaceToCode(demoWorkspace);

  console.log(pythonContent)
  var message = {
      type: "websim",
      content: pythonContent
  };
  console.log("Sending code to websocket")
  socket.send(JSON.stringify(message));
}
/////////////////////////////////////////////////////////////////////////////



export function WebSocketConnection(uri) {
  var socket = new WebSocket(uri);
  socket.onopen = function(evt) {
    console.log("Conexión WS establecida con el Servidor")
    document.getElementById("saveCode").disabled = false
  };

  socket.onmessage = function(evt) {
    console.log("MESSAGE")
  };

  socket.onerror = function(evt) {
    console.error(evt.data);
  };

  socket.onclose = function (evt) {
    wsClose(evt);
  };

  return socket 
}

export function wsClose(evt) {
  console.error(evt.data);
  console.log("Cierre de conexión WebSockets detectado. Intentando Reconectar.")
  document.getElementById("saveCode").disabled = true
  setTimeout(function() {
    WebSocketConnection(wsUri);
  },500);
}
