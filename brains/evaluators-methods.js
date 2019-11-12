const brains = require('./brains-methods.js');
const utils = require('../simcore/utils/index.js');
const setIntervalSynchronous = utils.setIntervalSynchronous;

var evaluators = {};
var evaluator;
evaluators.runEvaluator = (arrayRobots,config_file)=>{
   evaluator = require("../assets/evaluators/"+config_file);
   evaluator.createInterface();
   brains.threadsBrains.push({
     "id": "evaluator",
     "running": true,
     "iteration": evaluators.createTimeoutEvaluator(arrayRobots,"evaluator"),
     "codeRunning": ""
   });
}

var stopTimeoutRequested;

evaluators.createTimeoutEvaluator = (arrayRobots,id)=>{
  stopTimeoutRequested = false;
  let brainIteration = setTimeout(async function iteration(){
    evaluator.setEvaluator(arrayRobots);
    if (!stopTimeoutRequested) {
        var t = setTimeout(iteration, 400);
        var threadBrain = brains.threadsBrains.find((threadBrain)=> threadBrain.id == id);
        threadBrain.iteration = t;
    }
  }, 400);
  return brainIteration;
}

module.exports = evaluators;
