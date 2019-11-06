  var camaraBlack=myRobot.getObjectColor("black");
  console.log(camaraBlack);
  myRobot.setV(1);
  if (!camaraBlack.area){
    myRobot.setW(0.1);
    myRobot.setL(0.1);
  }else{
    if(camaraBlack.area>400){
      myRobot.setV(0);
    }else if(camaraBlack.area>500){
      myRobot.setV(-1);
    }
    if(camaraBlack.center[1]>10 & camaraBlack.center[1]<25){
      myRobot.setL(0.5);
    }else if(camaraBlack.center[1]>50 & camaraBlack.center[1]<85){
      myRobot.setL(-0.1);
    }else{
      myRobot.setL(0);
    }
    if(camaraBlack.center[0]<57){
      myRobot.setW(0.1);
    }else if(camaraBlack.center[0]>93 && camaraBlack.center[0]<150){
      myRobot.setW(-0.1);
    }else{
      myRobot.setW(0);
    }
  }
