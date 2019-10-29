export function runEvaluator(arrayRobots,config_file){
  if(config_file){
    var evaluator = require("../assets/evaluators/"+config_file);
    evaluator.main(arrayRobots);
  }
}
