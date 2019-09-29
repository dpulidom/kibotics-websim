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
  var blocklyArea = document.getElementById('editor');
  var blocklyDiv = document.getElementById('blockly-div');
  var right = document.getElementById('myIFrame');
  var bar = document.getElementById('dragbar');

  workspace = Blockly.inject(blocklyDiv,
      {toolbox: document.getElementById('toolbox')});


var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    Blockly.svgResize(workspace);
  };
  window.addEventListener('resize', onresize, false);
  onresize();
  Blockly.svgResize(workspace);
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  
  const drag = (e) => {
    document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
    blocklyArea.style.width = (e.pageX - bar.offsetWidth / 2) + 'px';
    onresize();
  }

  bar.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', drag);
  });

  bar.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', drag);
  });
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

export function changeSpectatorCamera(){
  var subjCamera = document.querySelector("#subjCamera");
  var spectatorCamera = document.querySelector("#primaryCamera");
  var firstPersonCamera = document.querySelector("#firstPersonCamera");
  var camera1 = subjCamera.getAttribute('camera','active');
  var camera2 = spectatorCamera.getAttribute('camera','active');
  var camera3 = firstPersonCamera.getAttribute('camera','active');
  if(camera1.active===true){
    spectatorCamera.setAttribute('camera', 'active', true);
  }else if(camera2.active===true){
    firstPersonCamera.setAttribute('camera', 'active', true);
  }else if(camera3.active==true){
    subjCamera.setAttribute('camera', 'active', true);
  }
}

export function saveCode(demoWorkspace, socket){
  console.log("Getting code from the embedded editor.")
  var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
  var xml_text = Blockly.Xml.domToText(xml);

  var message = {
      type: "save_scratch",
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
      type: "get_pibot_scratch",
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
    if ( JSON.parse(event.data).type == 'get_pibot_scratch_R') {
      console.log(JSON.parse(event.data))
      window.location = JSON.parse(event.data).content
      var win = window.open('http://10.3.141.1:8001', '_blank');
      win.focus();
    }

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