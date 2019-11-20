const utils = require('../simcore/utils/index.js');
const sleep = utils.sleep;
const setIntervalSynchronous = utils.setIntervalSynchronous;

var brains = {};
brains.threadsBrains = [];

function cleanCode(c) {
  /* Remove anything subsequent to an infinite loop */
  if (c.split("while(true)").length <= 2) {
    // only one infinite loop allowed
    var loop = c.split("while(true)")[1];
    var endwhile;
    for (var char=0, ignore=-1; char < loop.length; char++) {
      if (loop[char] == '{') {
        // another JS sentence starting ({) found
        ignore += 1;
      } else if (loop[char] == '}') {
        if (ignore > 0) {
          // if another sentence starting was found
          // this (}) is not the end of the infinite loop
          ignore -= 1;
        } else {
          // end of infinite loop found
          endwhile = char;
          break;
        }
      }
    }
    loop = loop.substring(0,endwhile+1); // removing anythinf after end of loop
    // recovering the previous code and building the clean code
    var newc = c.split("while(true)")[0] + "while(true)" + loop;
    return newc;
  } else {
    return c; 
  }
}

var stopTimeoutRequested;
brains.createTimeoutBrain = (code, myRobot, id)=>{
  stopTimeoutRequested = false;
  var iterative_code, sequential_code;
  // SI+ Applications
  if (code.split("while(true)").length <= 2) { 
    // only one infinite loop allowed
    if (code.indexOf("while(true)") != -1) {
      if (code.split("while(true)")[0] == "async function myAlgorithm(){\n"){
        sequential_code = null;
      } else {
        sequential_code = code.split("while(true)")[0] + '\n}\nmyAlgorithm();' // S
      }
      iterative_code = "async function myAlgorithm()" + code.split("while(true)")[1]; // I
      var pos = iterative_code.lastIndexOf('}');
      iterative_code = iterative_code.substring(0,pos) + '' + iterative_code.substring(pos+1);
    } else {
      sequential_code = code;
      iterative_code = null;
    }
    //console.log('sequential:\n'+sequential_code);
    //console.log('iterative:\n'+iterative_code);

    let brainIteration = setTimeout(async function iteration(){
      if (sequential_code != null) {
        await eval(sequential_code);
        sequential_code = null;
      }
      if (iterative_code != null) {
        await eval(iterative_code);
        if (!stopTimeoutRequested) {
            var t = setTimeout(iteration, 100);
            var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == id);
            threadBrain.iteration = t;
        }
      }
    }, 100);
    return brainIteration;

  } else {
    Swal.fire({
      type: 'error',
      text: 'Oops...',
      title: 'Error en el código.\nSólo puedes poner un bucle infinito',
    });
    return undefined;
  }
}

brains.runBrain = (robotID, code) =>{
  /**
   * Function to create a "thread" and execute UI code
   * also saves the "thread" on an array of running threadss
   *
   * @param {Object} myRobot RobotI object used to run code from UI
   */

  code = cleanCode(code);
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

brains.resumeBrain = (robotID, code) =>{
  code = cleanCode(code);
  code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  threadBrain.iteration = brains.createTimeoutBrain(code, Websim.robots.getHalAPI(robotID), robotID);
  threadBrain.running = true;
  threadBrain.codeRunning = code;
}

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
