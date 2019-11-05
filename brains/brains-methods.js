const utils = require('../simcore/utils/index.js');
const sleep = utils.sleep;
const setIntervalSynchronous = utils.setIntervalSynchronous;


var brains = {};

brains.threadsBrains = [];

brains.createThreadBrain = (code, myRobot)=>{
  let brainInterval = setInterval(()=>{
    eval(code);
  }, 100);
  return brainInterval;
}

var stopTimeoutRequested;
brains.createTimeoutBrain = (code, myRobot, id)=>{
  stopTimeoutRequested = false;
  let brainIteration = setTimeout(async function iteration(){
    await eval(code);
    if (!stopTimeoutRequested) {
        var t = setTimeout(iteration, 100);
        var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == id);
        threadBrain.iteration = t;
    }
  }, 100);
  return brainIteration;
}

/*brains.runBrain = (robotID, code) =>{
  
  code = code + 'myAlgorithm();';
  brains.threadsBrains.push({
    "id": robotID,
    "running": true,
    "interval": brains.createThreadBrain(code, Websim.robots.getHalAPI(robotID)),
    "codeRunning": code
  });
}
var pegote = '\nif (!stopTimeout) {\nlet p = setTimeout(()=>{eval(newCode);}, 100);console.log(p);\nvar threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == "'+id+'");\nthreadBrain.interval = p;\n}\n'

*/

brains.runBrain = (robotID, code) =>{
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

brains.threadExists = (robotID)=>{
  return brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
}

brains.isThreadRunning = (robotID)=>{
  /**
   * Function to check if a thread is running
   *
   * @param {string} threadID ID of the thread to check if running
   */
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  return threadBrain.running;
}

/*brains.resumeBrain = (robotID, code) =>{
  code = code + 'myAlgorithm();';
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  threadBrain.interval = brains.createThreadBrain(code, Websim.robots.getHalAPI(robotID));
  threadBrain.running = true;
  threadBrain.codeRunning = code;
}*/

brains.resumeBrain = (robotID, code) =>{
  code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  threadBrain.iteration = brains.createTimeoutBrain(code, Websim.robots.getHalAPI(robotID), robotID);
  threadBrain.running = true;
  threadBrain.codeRunning = code;
}


/*brains.stopBrain = (robotID) =>{
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  clearInterval(threadBrain.interval);
  threadBrain.running = false;
}*/

brains.stopBrain = (robotID) =>{
  /**
   * Stops all threads running
   */
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  stopTimeoutRequested = true;
  clearTimeout(threadBrain.iteration);
  threadBrain.running = false;
}

brains.showThreads = ()=>{
  /**
   * Function used for debugging, prints all threads data
   */
  brains.threadsBrains.forEach((threadBrain)=>{
    console.log(threadBrain);
  })
}

module.exports = brains;
