import {RobotI} from './interfacesRobot.js';
import {arrayRobots, arrayIds, arrayLoadedBodyRobots, simEnabled} from '../globals';
import {sleep, arraysEqual} from '../utils';
import {progressBar,setTime} from './evaluator.js'

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

export function executeCode(robotId, code){
    var tempRobot = getRobotCopy(robotId);
    if (simEnabled){
        tempRobot.execute(code);
    }
}

export function getHalAPI(robotId){
    var robot = null;
    arrayRobots.forEach((robotInstance)=>{
        if (robotId === robotInstance.getID()){
            robot = robotInstance;
        }
    });
    return robot
}

export function evaluator(){
  /**
    Do an evaluator taking the functions from ./evaluator.js
  */
  setInterval(progressBar,100,arrayRobots);
  setTime(arrayRobots[0]);
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
