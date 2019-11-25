const brains = require('./brains-methods.js');

var agents = {};

agents.code;

agents.runAgent = (robotID, code) =>{
  /*
   * Function to create a "thread" and execute Agent's code
   * also saves the "thread" on an array of running threads
   *
   * @param {Object} robotID string used to identify the robot 
      associated with the Agent
   */

  code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
  brains.threadsBrains.push({
    "id": robotID,
    "running": true,
    "iteration": brains.createTimeoutBrain(code, Websim.robots.getHalAPI(robotID), robotID),
    "codeRunning": code
  });
}

agents.resumeAgent = (robotID, code) =>{
  /*
   * Resumes Agent's running code
   */
  code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  threadBrain.iteration = brains.createTimeoutBrain(code, Websim.robots.getHalAPI(robotID), robotID);
  threadBrain.running = true;
  threadBrain.codeRunning = code;
}

agents.stopAgent = (robotID) =>{
  /*
   * Stops Agent's running code
   */
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  stopTimeoutRequested = true;
  clearTimeout(threadBrain.iteration);
  threadBrain.running = false;
}

agents.getCode = (file) => {
  //
   // Reads Agent's code from file
   //
  var request = new XMLHttpRequest();
  request.open("GET", file);
  request.onreadystatechange = function () {
    if(request.status === 200 || request.status == 0) {
        agents.code = request.responseText;
    }
  }
  request.send();
}
if(typeof file_agent!="undefined"){
  agents.getCode(file_agent);
}

module.exports = agents;
