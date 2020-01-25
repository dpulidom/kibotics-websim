const utils = require('../simcore/utils/index.js');
const sleep = utils.sleep;
const setIntervalSynchronous = utils.setIntervalSynchronous;


async function advanceTo(distance,myRobot,worker){
  let pos_x = myRobot.getPosition().x;
  let pos_z = myRobot.getPosition().z;
  distance > 0 ? myRobot.setV(1) : myRobot.setV(-1);
  while(Math.sqrt(Math.pow(pos_x-myRobot.getPosition().x,2)
      + Math.pow(pos_z-myRobot.getPosition().z,2)) <= Math.abs(distance)) {
        await sleep(0.1);
  }
  myRobot.setV(0);
  worker.postMessage({message:"finished"});
}

async function turnUpTo(angle,myRobot,worker) {
  let initial_position = myRobot.getPosition().theta;
  angle > 0 ? myRobot.setW(-0.15) : myRobot.setW(0.15);
  while (Math.abs(initial_position - myRobot.getPosition().theta) <= Math.abs(angle)) {
      await sleep(0.1);
  }
  myRobot.setW(0);
  worker.postMessage({message:"finished"});
}

async function land(myRobot,worker){
  let position = myRobot.getPosition().y;
  if (position > 1.6) {
      while (myRobot.getPosition().y > 1.6) {
          myRobot.setL(-2);
          await sleep(0.2);
      }
  }
  myRobot.setL(0);
  worker.postMessage({message:"finished"});
}

async function takeOff(myRobot,worker){
  let position = myRobot.getPosition().y;
  if (position < 10) {
      while (myRobot.getPosition().y < 10) {
          myRobot.setL(2);
          await sleep(0.2);
      }
  }
  myRobot.setL(0);
  worker.postMessage({message:"finished"});
}

export function reply(message,worker,myRobot){
/**
Miniproxy: To handler messages from worker and translate to HALapi
**/
  switch (message.message) {
    case "lineal":
      eval("myRobot."+ message.function + "(" + message.parameter + ")");
      break;
    case "move":
      myRobot.move(message.v,message.w,message.h);
      break;
    case "avanzar":
      advanceTo(message.parameter,myRobot,worker);
      break;
    case "girar":
      turnUpTo(message.parameter,myRobot,worker);
      break;
    case "aterrizar":
      land(myRobot,worker);
      break;
    case "despegar":
      takeOff(myRobot,worker);
      break;
    case "velocidad":
      var velocity = eval("myRobot."+message.function + "();");
      worker.postMessage({message:"velocidad",function:message.function,parameter:velocity});
      break;
    case "sensor":
      var sensor = eval("myRobot."+message.function + "();");
      worker.postMessage({message:"sensor",function:message.function,parameter:sensor});
      break;
    case "camera":
      var sensor = eval("myRobot." + message.function + "(\"" + message.color + "\");");
      worker.postMessage({message:"camera",function:message.function,parameter:sensor});
      break;
    case "cameraRGB":
      var sensor = myRobot.getObjectColorRGB(message.color[0],message.color[1]);
      worker.postMessage({message:"camera",function:message.function,parameter:sensor});
      break;
    case "image":
      var camera = myRobot.getImage(message.id);
      worker.postMessage({message:"image",function:message.function,parameter:camera});
      break;
    default:
      console.log("Mensaje recibido en proxy: " + message);
  }
}
