
export function reply(message,myRobot){
  console.log("tipo de mensaje: " + message.message);
  switch (message.message) {
    case "lineal":
    eval("myRobot."+ message.function + "(" + message.parameter + ")");
      break;
    default:
      console.log("otro mensaje");
  }
}
