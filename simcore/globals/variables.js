export var arrayIds = [];
export var arrayRobots = [];
export var arrayBrainsStatus = [];
export var arrayLoadedBodyRobots = [];
export var simEnabled = true;

export function changeSimulationValue(value){
    simEnabled = value;
}

export function getBrainStatus(robotID){
  var brain;
  arrayBrainsStatus.forEach(element =>{
    if(element.id==robotID){
      brain = element;
    }
  });
  return brain;
}
