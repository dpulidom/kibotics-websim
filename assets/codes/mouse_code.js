async function myAlgorithm(){
    myRobot.despegar();
    var position = myRobot.getPosition();
    console.log(position);
    if(position.z>-35){
      myRobot.setV(1);
    }else if(position.theta>160 & position.theta<190 & position.z<-35 && position.z>-55){
      myRobot.setW(0);
      myRobot.setV(2);
    }else if(position.z<-35){
      myRobot.setV(0);
      myRobot.setW(0.1);
    }else if(position.x<-55 & position.theta>160 & position.theta<180){
      myRobot.setW(0.1);
    }else if(position.theta>-60 && position.theta<-40){
      myRobot.setW(0);
      myRobot.setV(3);
    }
}
