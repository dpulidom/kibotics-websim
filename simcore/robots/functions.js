import {RobotI} from './interfacesRobot.js';
import {arrayRobots, arrayIds, arrayLoadedBodyRobots} from '../globals';
import {sleep} from '../utils';

export function resetRobots(){
    /**
     * This function resets all robots in WebSim currently running in WebSim
     */
    arrayRobots.forEach((robot)=>{
        robot.resetRobot();
    });
}

export async function createRobots(){
    /**
     * Waits until arrayIds and arrayLodadedBodyRobots are equal
     * that means that all bodies of the robots parsed are loaded
     */
    return new Promise(async (resolve, reject)=>{
        while (!arraysEqual(arrayIds, arrayLoadedBodyRobots)){
            await sleep(0.2);
        }
        arrayIds.forEach(await createRobot);
        resolve();
    });
}

function arraysEqual(a, b) {
    /**
     * Function to check if to arrays are fully equals
     * 
     * @param {array} a Input array to compare with B
     * @param {array} b Input array to compare with A
     */
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

function createRobot(htmlID){
    /**
     * This function creates new robots inside WebSim
     * and stores it in an array of robots
     * 
     * @param {string} htmlID The identifier for the robot
     */
    return new Promise(async (resolve, reject)=>{
        await arrayRobots.push(new RobotI(htmlID));
        console.log("Added robot to,", arrayRobots)
        resolve();
    })
}