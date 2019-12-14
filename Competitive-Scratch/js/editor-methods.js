var editFirst = true;
var editSecond = false;
var codeFirst = null;
var codeSecond = null;

var editor = {};

editor.ui = {};

editor.mainVarId1 = null;
editor.mainVarId2 = null;

editor.setup = () =>{
  editor.ui = editor.setupBlockly(editor.ui); // Sets up blockly editor
  if (window.userCode1) {
    editor.ui = editor.injectCode(editor.ui, window.userCode1); // Inject (Load) blockly user code in editor
  }
}

editor.setupBlockly = (workspace) =>{
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

editor.toggleCamera = () =>{
    var opencvCam = document.querySelector("#outputCanvas");
    var imageCamBtn = document.querySelector("#cambtn").firstChild;
    $("#outputCanvas, #spectatorDiv").toggle();
    if(opencvCam.style.display != "none"){
      imageCamBtn.src = stop_camera_icon;
    }else{
      imageCamBtn.src = play_camera_icon;
    }
}

editor.injectCode = (workspace, xmlCodeText) =>{
  if (xmlCodeText != undefined){
    workspace.clear();
    var xmlToInject = Blockly.Xml.textToDom(xmlCodeText);
    Blockly.Xml.domToWorkspace(xmlToInject, workspace);
    console.log("Code injected into workspace");
  }
  return workspace;
}

editor.sendEvent = (eventName, eventDetail = '') =>{
  var ev = new CustomEvent(eventName, {
    'detail': eventDetail
  });
  document.dispatchEvent(ev);
}

editor.changeSpectatorCamera = () =>{
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

editor.saveCode = (demoWorkspace, socket) =>{
  //REVISITAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARRRRRRRRRRR
  console.log("Getting code from the embedded editor.")
  var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
  var xml_text = Blockly.Xml.domToText(xml);

  var message = {
      type: "save_scratch",
      content: xml_text
  };

  socket.send(JSON.stringify(message));
}

editor.storeCode = (demoWorkspace, edit1, edit2) =>{
  console.log("Storing code from the embedded editor.")
  var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
  variables = xml.getElementsByTagName('variable');
  for (var v=0;v<variables.length;v++){
    if (variables[v].innerHTML == "myRobot"){
        if (edit1 && !editor.mainVarId1) {
            console.log("1: " + variables[v].id);
            editor.mainVarId1 = variables[v].id
        }
        if (edit2 && !editor.mainVarId2) {
            console.log("2: " + variables[v].id);
            editor.mainVarId2 = variables[v].id
        }
        variables[v].parentNode.removeChild(variables[v]);
    }
  }
  fields = xml.getElementsByTagName('field');
  for (var f=0;f<fields.length;f++){
    if (fields[f].innerHTML == "myRobot"){
        if (edit1) {fields[f].id = editor.mainVarId1;}
        if (edit2) {fields[f].id = editor.mainVarId2;}
    }
  }
  var xml_text = Blockly.Xml.domToText(xml);
  //console.log(xml_text);
  demoWorkspace.clear();
  return xml_text
}


editor.getCode = () =>{
  /**
   * Function that extracts code of the current context
   * of the editor
   */
  c = Blockly.JavaScript.workspaceToCode(editor.ui);
  c =  c.replace('var myRobot;', '');
  c =  c.replace('var myRobot,', 'var');
  c =  c.replace(', myRobot;', ';');
  return c
}

/*function sleep2(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/

/////////////////// descarga local websim pibot
editor.downloadZip = (demoWorkspace, socket) =>{
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

editor.WebSocketConnection = (uri) =>{
  var socket = new WebSocket(uri);
  socket.onopen = function(evt) {
    console.log("Conexión WS establecida con el Servidor")
    document.getElementById("saveCode").disabled = false
  };

  socket.onmessage = function(evt) {
    if ( JSON.parse(evt.data).type == 'get_pibot_scratch_R') {
      console.log(JSON.parse(evt.data))
      window.location = JSON.parse(evt.data).content
      var win = window.open('http://10.3.141.1:8001', '_blank');
      win.focus();
    }

  };

  socket.onerror = function(evt) {
    console.error(evt.data);
  };

  socket.onclose = function (evt) {
    //editor.wsClose(evt);
    console.log("Cierre de conexión WebSockets detectado.")
  };

  return socket
}

editor.wsClose = (evt) =>{
  console.error(evt.data);
  console.log("Cierre de conexión WebSockets detectado. Intentando Reconectar.")
  document.getElementById("saveCode").disabled = true
  setTimeout(function() {
    WebSocketConnection(wsUri);
  },500);
}

module.exports = editor;
