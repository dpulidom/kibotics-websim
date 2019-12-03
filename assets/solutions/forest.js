
myRobot.setV(1.5);
myRobot.setW(0);
while(true){
    var distances=myRobot.getDistances();
    myRobot.setV(1.5);
    myRobot.setW(0);
    var menor=10;
    var id=15;
    for(var i=10;i<20;i++){
      if(distances[i]<menor){
        menor=distances[i];
        id=i;
      }
    }
    console.log(menor,id);
    if(menor<9){
      if(id==15){
        myRobot.setV(0.75);
        myRobot.setW(-0.1);
      }else if(id<15){
        myRobot.setV(1);
        myRobot.setW(0.05);
      }else if(id>15){
        myRobot.setV(1);
        myRobot.setW(-0.05);
      }
    }
}
