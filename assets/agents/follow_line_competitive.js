
var camara=myRobot.getObjectColor("white");
myRobot.setV(1);
myRobot.setW(0);

if(camara.center[0]<40){
  myRobot.setW(0.4);
}else if(camara.center[0]>70){
  myRobot.setW(-0.4);
}




        
