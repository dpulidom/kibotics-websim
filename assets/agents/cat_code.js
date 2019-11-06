  var camaraBlack=myRobot.getObjectColor("black");
  if(myRobot.getPosition().y<2.5){
    myRobot.setL(3);
    await sleep(0.5);
    myRobot.setL(0);
  }
  console.log(camaraBlack);
  if (!camaraBlack.area){
    myRobot.setW(-0.1);
  }else{
    myRobot.setL(0);
    console.log(myRobot.getDistance());
    if(myRobot.getDistance()<9 && myRobot.getDistance()>6){
      myRobot.setV(-0.1);
    }else if(myRobot.getDistance()<6 && myRobot.getDistance()>0){
      myRobot.setV(-1);
    }else{
      myRobot.setV(1);
    }
    if(camaraBlack.center[0]<57){
      myRobot.setW(0.1);
    }else if(camaraBlack.center[0]>93 && camaraBlack.center[0]<150){
      myRobot.setW(-0.1);
    }else{
      myRobot.setW(0);
    }
  }
