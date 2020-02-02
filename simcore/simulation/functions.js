import {spectObject, intersectionHandlerObj, followBodyObj} from './aframe-components';
import {arrayIds, arrayLoadedBodyRobots, simEnabled, arrayRobots, changeSimulationValue, arrayBrainsStatus} from '../globals';
export var active = false;
export var refreshInterval = null;

export function robotLoader(){
    /**
   * Declares event listener to create robots when DOM even triggered
   */
    document.addEventListener('body-loaded', async (bodyLoaded)=>{
      var exists = arrayIds.includes(bodyLoaded.target.id);
      if(exists){
        var robotID = bodyLoaded.target.id;
        console.log("Body for robot with ID -->", robotID, "loaded.");
        arrayLoadedBodyRobots.push(robotID);
      }
    });
}

export function extendAFrame(){
  /**
   * Configure needed AFRAME components for WebSim
   */
  AFRAME.registerComponent('spectator', spectObject);
  AFRAME.registerComponent("intersection-handler", intersectionHandlerObj);
  AFRAME.registerComponent("follow-body", followBodyObj);
}

export function toggleSimulation(){
  var runbtn = document.querySelector("#runbtn").firstChild;
  var scene = document.querySelector("#scene");
  if(!simEnabled){
    scene.play();
    runbtn.src ="../assets/resources/stop-icon.png";
  }else{
    runbtn.src ="../assets/resources/play-icon.png";
    scene.pause();
  }
  console.log('Setting simulation state to:', !simEnabled);
  changeSimulationValue(!simEnabled);
  // arrayRobots.forEach(robot =>{
  //   robot.changeSimulationValue(simEnabled);
  //   console.log(robot);
  // });
}
