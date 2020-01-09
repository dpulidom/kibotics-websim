// const utils = require('../simcore/utils/index.js');
// const sleep = utils.sleep;
// const setIntervalSynchronous = utils.setIntervalSynchronous;
//


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
  const PYTHON_WHILE = "while(true)";
  const PYONBROWSER_WHILE = "while ( (__PyTrue__).__bool__ () === __PyTrue__)";
  const START_USER_CODE = "// START USER CODE";
  const END_USER_CODE = "// END USER CODE";
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


function initializeWorker(){
  console.log("LOG -----> Starting worker");
  importScripts("../../simcore/robots/interfacesRobotWW.js");
  worker = {};
  worker.threadsWorker = [];
  stopTimeoutRequested = false;
  //cargar HALapiWebWorker
  //obtener código de usuario
}

function createTimeout(code, myRobot, id){
  var stopTimeoutRequested = false;
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
}

function createTimeoutWorker(code,myRobot,id){
  let workerIteration = setTimeout(async function iteration(){
      await eval(code);
      if (!stopTimeoutRequested) {
          var t = setTimeout(iteration, 100);
          var threadsWorker = worker.threadsWorker.find((threadsWorker)=> threadsWorker.id == id);
          threadsWorker.iteration = t;
      }
  }, 100);
  return workerIteration;
}


async function createTimeout(code,myRobot){
  code = cleanCode(code);
  code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
  var robotID = myRobot.myRobotID;
  worker.threadsWorker.push({
    "id": robotID,
    "running": true,
    //"iteration": createTimeout(code, Websim.robots.getHalAPI(robotID), robotID),
    "iteration": createTimeoutWorker(code,myRobot,robotID),
    "codeRunning": code
  });
  await eval(code);
}

onmessage = function (e) {
  var data = e.data;
  switch (data.message) {
    case "user_code":
      var myRobot = new RobotIWW(data.robotID);
      setTimeout(createTimeout,100,data.code,myRobot);
      //postMessage({"message":"setV","parameter":0.1});
      break;
    default:
      console.log("otro mensaje");
  }
};

initializeWorker();
