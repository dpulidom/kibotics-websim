const utils = require('../simcore/utils/index.js');
const adapter = require('./adapter.js');
const sleep = utils.sleep;
const setIntervalSynchronous = utils.setIntervalSynchronous;

var brains = {};
brains.threadsBrains = [];
brains.workerActive = [];

const PYTHON_WHILE = "while(true)";
const PYONBROWSER_WHILE = "while ( (__PyTrue__).__bool__ () === __PyTrue__)";
const START_USER_CODE = "// START USER CODE";
const END_USER_CODE = "// END USER CODE";

function getLoopEnd(loop) {
  let endWhile;
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
        endWhile = char;
        break;
      }
    }
  }
  if (endWhile+1 < loop.length-1) {
    alert('Detectado código después del bucle infinito. Ese código se ignorará.')
    /*Swal.fire({
      type: 'info',
      text: 'Ese código no se ejecutará',
      title: 'Detectado código después del bucle infinito',
    });*/
  }
  return endWhile;
}


function cleanCode(code) {
  /* Remove anything subsequent to an infinite loop */
  if (code.split(PYTHON_WHILE).length <= 2 && code.indexOf(PYTHON_WHILE) != -1) {
    // only one infinite loop allowed
    var loop = code.split(PYTHON_WHILE)[1];
    let endWhile = getLoopEnd(loop);
    loop = loop.substring(0,endWhile+1); // removing anything after end of loop
    // recovering the previous code and building the cleaned code
    var newCode = code.split(PYTHON_WHILE)[0] + PYTHON_WHILE + loop;
    return newCode;
  } else {
    return code;
  }
}

var stopTimeoutRequested;
brains.createTimeoutBrain = (code, myRobot, id)=>{
  stopTimeoutRequested = false;
  var iterative_code, sequential_code;
  // SI+ Applications
  if (code.split(PYTHON_WHILE).length <= 2 && code.split(PYONBROWSER_WHILE).length <= 2) {
    // only one infinite loop allowed
    if (code.indexOf(PYTHON_WHILE) != -1) {
      if (code.split(PYTHON_WHILE)[0] == "async function myAlgorithm(){\n"){
        sequential_code = null;
      } else {
        sequential_code = code.split(PYTHON_WHILE)[0] + '\n}\nmyAlgorithm();' // S
      }
      iterative_code = "async function myAlgorithm()" + code.split(PYTHON_WHILE)[1]; // I
      var pos = iterative_code.lastIndexOf('}');
      iterative_code = iterative_code.substring(0,pos) + '' + iterative_code.substring(pos+1);
    } else if (code.indexOf(PYONBROWSER_WHILE) !== -1) {
      let start_general_code = code.split(START_USER_CODE)[0];
      let end_general_code = code.split(END_USER_CODE)[1];
      let user_code = code.split(START_USER_CODE)[1];
      user_code = user_code.split(END_USER_CODE)[0];
      if (code.split(PYONBROWSER_WHILE)[0] === "async function myAlgorithm(){\n") {
        sequential_code = null;
      } else {
        sequential_code = user_code.split(PYONBROWSER_WHILE)[0]
        sequential_code = start_general_code + sequential_code + end_general_code;
      }
      var loop = user_code.split(PYONBROWSER_WHILE)[1];
      let endWhile = getLoopEnd(loop);
      loop = loop.substring(0,endWhile+1);
      iterative_code = start_general_code + loop + end_general_code;
    } else {
      sequential_code = code;
      iterative_code = null;
    }
    // console.log('sequential:\n'+sequential_code);
    // console.log('iterative:\n'+iterative_code);

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
    alert('Error en el código.\nSólo puedes poner un bucle infinito.');
    /*Swal.fire({
      type: 'error',
      text: 'Modifica el código y vuelve a ejecutar',
      title: 'Error en el código.\nSólo puedes poner un bucle infinito',
    });*/
    return undefined;
  }
};

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
};

brains.threadExists = (robotID)=>{
  return brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
};

brains.isThreadRunning = (robotID)=>{
  /**
   * Function to check if a thread is running
   *
   * @param {string} threadID ID of the thread to check if running
   */
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  return threadBrain.running;
};

brains.resumeBrain = (robotID, code) =>{
  code = cleanCode(code);
  code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  threadBrain.iteration = brains.createTimeoutBrain(code, Websim.robots.getHalAPI(robotID), robotID);
  threadBrain.running = true;
  threadBrain.codeRunning = code;
};

brains.stopBrain = (robotID) =>{
  /**
   * Stops all threads running
   */
  var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == robotID);
  stopTimeoutRequested = true;
  clearTimeout(threadBrain.iteration);
  threadBrain.running = false;
};

brains.runWorkerBrain = (robotID,code) =>{
  /**
   * Function to create a webworker and send it user code
   *
   * @param {Object} myRobot RobotI object used to run code from UI
   */
    brains.workerActive.forEach(element=>{
      if(element.robotID==robotID && element.running){
        brains.w.terminate();
        console.log("Worker ya lanzado. Se sustituye el existente");
        const index = brains.workerActive.indexOf(element);
        if (index > -1) {
          brains.workerActive.splice(index, 1);
        }
      }
    });
  if(typeof(Worker)!=="undefined"){
      brains.workerActive.push({robotID:robotID,running:true})
      brains.w = new Worker("../../brains/worker.js"); // starting worker
      var myRobot = Websim.robots.getHalAPI(robotID);
      brains.w.postMessage({"message":"user_code","robotID":robotID,"code":code});
      brains.w.onmessage = function(e) {
        adapter.reply(e.data,brains.w,myRobot);//reply function (mini-proxy)
      }
  }else{
    console.log("Your browser does not support web workers");
  }
}

brains.stopWorker = () => {
  brains.w.terminate();
}


brains.showThreads = ()=>{
  /**
   * Function used for debugging, prints all threads data
   */
  brains.threadsBrains.forEach((threadBrain)=>{
    console.log(threadBrain);
  })
};

module.exports = brains;
