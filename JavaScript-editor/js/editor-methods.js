
var editor = {};

// Used to store current UI context for later use
editor.ui = {};

editor.threadsBrains = [];

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


editor.createThreadBrain = (code, myRobot)=>{
  let brainInterval = setInterval(()=>{
    eval(code);
  }, 60);
  return brainInterval;
}


editor.runBrain = (myRobot, robotID) =>{
  /**
   * Function to create a "thread" and execute UI code
   * also saves the "thread" on an array of running threadss
   *
   * @param {Object} myRobot RobotI object used to run code from UI
   */


  let code = editor.getCode() + 'myAlgorithm();'

  editor.threadsBrains.push({
    "id": robotID,
    "running": true,
    "interval": editor.createThreadBrain(code, myRobot),
    "codeRunning": code
  });
}

editor.stopBrain = (threadID) =>{
  /**
   * Stops all threads running
   */
  var threadBrain = editor.threadsBrains.find((threadBrain)=> threadBrain.id == threadID);
  clearInterval(threadBrain.interval);
  threadBrain.running = false;
}

editor.isThreadRunning = (threadID)=>{
  /**
   * Function to check if a thread is running
   *
   * @param {string} threadID ID of the thread to check if running
   */
  var threadBrain = editor.threadsBrains.find((threadBrain)=> threadBrain.id == threadID);
  return threadBrain.running;
}

editor.threadExists = (threadID)=>{
  return editor.threadsBrains.find((threadBrain)=> threadBrain.id == threadID);
}

editor.resumeBrain = (myRobot, threadID) =>{
  let code = editor.ui.getValue() + 'myAlgorithm();';
  var threadBrain = editor.threadsBrains.find((threadBrain)=> threadBrain.id == threadID);

  threadBrain.interval = editor.createThreadBrain(code, myRobot);
  threadBrain.running = true;
  threadBrain.codeRunning = code;
}

editor.showThreads = ()=>{
  /**
   * Function used for debugging, prints all threads data
   */
  editor.threadsBrains.forEach((threadBrain)=>{
    console.log(threadBrain);
  })
}


function sleep2(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = editor;
