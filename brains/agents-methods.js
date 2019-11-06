const brains = require('./brains-methods.js');


var agents = {};

agents.runAgents = (robotID,file) =>{
  /**
   * Function to create a "thread" and execute UI code
   * also saves the "thread" on an array of running threadss
   *
   * @param {Object} myRobot RobotI object used to run code from UI
   */
   var request = new XMLHttpRequest();
   request.open("GET", file, false);
   request.onreadystatechange = function () {
     if(request.status === 200 || request.status == 0) {
         var code = request.responseText;
         code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
         brains.threadsBrains.push({
           "id": robotID,
           "running": true,
           "iteration": brains.createTimeoutBrain(code, Websim.robots.getHalAPI(robotID), robotID),
           "codeRunning": code
         });
     }
   }
   request.send();
}

agents.resumeAgents = (robotID, file) =>{
  var request = new XMLHttpRequest();
  request.open("GET", file, false);
  request.onreadystatechange = function () {
    if(request.status === 200 || request.status == 0) {
        var code = request.responseText;
        code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
        var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
        threadBrain.iteration = brains.createTimeoutBrain(code, Websim.robots.getHalAPI(robotID), robotID);
        threadBrain.running = true;
        threadBrain.codeRunning = code;
    }
  }
  request.send();
}

module.exports = agents;
