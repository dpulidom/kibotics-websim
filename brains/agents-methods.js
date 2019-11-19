const brains = require('./brains-methods.js');

var agents = {};

agents.code;

agents.runAgent = (robotID, code) =>{
  /**
   * Function to create a "thread" and execute UI code
   * also saves the "thread" on an array of running threadss
   *
   * @param {Object} myRobot RobotI object used to run code from UI
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
  code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  threadBrain.iteration = brains.createTimeoutBrain(code, Websim.robots.getHalAPI(robotID), robotID);
  threadBrain.running = true;
  threadBrain.codeRunning = code;
}

agents.getCode = (file) => {
  var request = new XMLHttpRequest();
  request.open("GET", file);
  request.onreadystatechange = function () {
    if(request.status === 200 || request.status == 0) {
        agents.code = request.responseText;
    }
  }
  request.send();
}

agents.getCode(file_agent);

module.exports = agents;
