import editor from './editor-methods.js'
import brains from '../../brains/brains-methods.js'

var wsUri = window.wsUri;
console.log("-----===================---------------------------------");
console.log("@@@@@@@@@" + wsUri);
console.log("----------------------===========----------------");
var socket = "";

// parse robots config
var r = new XMLHttpRequest();
r.overrideMimeType("application/json");
r.open('GET', config_file, false);
r.send(null);
if (r.status == 200){
  var f = JSON.parse(r.responseText);
}
// Identify robot ID for the user and each agent
var robID;
var agentsIDs = [];
for (var robot in f.robots_config) {
  if (f.robots_config[robot].controller == 'user1') {
    robID = f.robots_config[robot].id;
  } else if (f.robots_config[robot].controller == 'agent') {
    agentsIDs.push([f.robots_config[robot].id, f.robots_config[robot].code]);
  }
}
console.log("user: " + robID);
console.log("agents: " + agentsIDs);

var editorRobot1 = robID; //id del robot (fichero json)

$(document).ready(async ()=>{
  editor.setup();

  $("#cambtn").click(()=>{
    editor.toggleCamera();
  });

  $("#spectatorCamera").click(()=>{
    changeSpectatorCamera();
  });

  $("#runbtn").click(()=>{
    /**
     * Function to execute when run button clicked, multiple options
     * supported:
     * - Creates thread for a robot if not exists and runs
     * - Stop thread for a robot if exists and running
     * - Resume thread for a robot if exists and not running
     */
    var iconRunBtn = document.querySelector("#runbtn").firstChild;
    if ($(iconRunBtn).hasClass("glyphicon-stop")){
        iconRunBtn.classList.remove("glyphicon-stop");
        iconRunBtn.classList.add("glyphicon-play");
        document.querySelector("#runbtn").innerHTML = document.querySelector("#runbtn").innerHTML.replace('Pausar Código', 'Ejecutar Código');
    } else {
        iconRunBtn.classList.remove("glyphicon-play");
        iconRunBtn.classList.add("glyphicon-stop");
        document.querySelector("#runbtn").innerHTML = document.querySelector("#runbtn").innerHTML.replace('Ejecutar Código','Pausar Código');
    }

    var pythonCodeString = editor.getCode();
    console.log(pythonCodeString);
    const request = new Request('/get_python_to_javascript_code', {method: 'POST', body: '{"python_code": "' + pythonCodeString +'"}'});
    fetch(request)
      .then(response => {
        return response.text();
      }).then(function(javascriptCodeString) {
        console.log(javascriptCodeString);
        if (brains.threadExists(editorRobot1)) {
          if (brains.isThreadRunning(editorRobot1)) {
            brains.stopBrain(editorRobot1);
          } else {
            brains.resumeBrain(editorRobot1, javascriptCodeString);
          }
        } else {
            brains.runBrain(editorRobot1,javascriptCodeString);
        }
      }).catch(error => {
      console.error(error);
    });
  });

  $("#saveCode").click(()=>{
    editor.saveCode(editor.ui, socket); // Declare function that extracts code from editor and sends to server via connection.send
  });

  $('#resetRobot').click(()=>{
    editor.sendEvent('reset');
  });

  $('#simButton').click(()=>{
    Websim.simulation.toggleSimulation();
  });

  // Only should try connect to Ws Server if wsUri is not null. Its necesary for avoiding error with no registered users
  if (wsUri != null){
    socket = wsocket; // declared in WebServer Template
    if (socket.readyState == WebSocket.OPEN) {
      document.getElementById("saveCode").disabled = false;
      socket.onclose = function (evt) {
        console.error(evt.data);
        console.log("Cierre de conexión WebSockets detectado.")
        document.getElementById("saveCode").disabled = true
      };
    }
  }

  // Init Websim simulator with config contained in the file passed
  // as parameter
  await Websim.config.init(config_file);

  //setInterval(brains.showThreads, 1000);
});
