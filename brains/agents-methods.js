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
         code = code + 'myAlgorithm();';
         console.log(code);
         brains.threadsBrains.push({
           "id": robotID,
           "running": true,
           "interval": brains.createThreadBrain(code, Websim.robots.getHalAPI(robotID)),
           "codeRunning": code
         });
     }
   }
   request.send();
}

module.exports = agents;
