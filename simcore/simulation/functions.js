import {spectObject, intersectionHandlerObj, followBodyObj} from './aframe-components';
import {arrayIds, arrayLoadedBodyRobots} from '../globals';
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