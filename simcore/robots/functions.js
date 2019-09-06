import {RobotI} from './interfacesRobot.js';
import {arrayRobots, arrayIds} from '../globals';

export function resetRobots(){
    /**
     * This function resets all robots in WebSim currently running in WebSim
     */
    arrayRobots.forEach((robot)=>{
        robot.resetRobot();
    });
}

export function storeRobotID(){
    /**
     * This function is used to store robot ids parsed
     * 
     */
    document.addEventListener('robot-parsed', (ev)=>{
        console.log('Storing robot id --> ', ev.detail);
        arrayIds.push(ev.detail);
    });
}

export function createRobot(htmlID){
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