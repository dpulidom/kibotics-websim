export function runEvaluator(arrayRobots,config_file){
  if(config_file){
    var evaluator = require("../assets/config_evaluator/"+config_file);
    evaluator.main(arrayRobots);
  }
}
