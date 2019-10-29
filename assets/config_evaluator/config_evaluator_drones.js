var evaluator = {};

evaluator.main= (arrayRobots)=>{
  createInterface();
  setGraphic(arrayRobots);
  setTime(arrayRobots[0]);
}

function createInterface(){
  /**
  *This function do a progress bar and text how much percent walked each robot
  */
  var node = document.createElement("div");
  node.setAttribute("id","panel");
  node.style.height="130px";
  node.style.backgroundColor="white";
  var time = document.createElement("div");
  time.setAttribute("id","time");
  time.marginLeft="50px";
  time.innerHTML="Tiempo: 00:00";
  time.style.color="black";
  time.style.textAlign="center";
  node.appendChild(time);
  var myiframe= document.getElementById("myIFrame");
  myiframe.insertBefore(node,myiframe.childNodes[0]);
}

function setGraphic(arrayRobots){
  myPanel = new jsgl.Panel(document.getElementById("panel"));
  setAxis(myPanel);
  var line = myPanel.createPolyline();
  line.getStroke().setColor('blue');
  line.getStroke().setWeight(2);
  var x= 20;
  var robot1 = Websim.robots.getHalAPI(arrayRobots[0]);
  var robot2 = Websim.robots.getHalAPI(arrayRobots[1]);
  setInterval(()=>{
    if(robot1.velocity.x >0 || robot2.velocity.x>0){
      var pos1 = robot1.getPosition();
      var pos2 = robot2.getPosition();
      var dist = Math.sqrt(Math.pow(pos2.x-pos1.x,2)+Math.pow(pos2.y-pos1.y,2)+Math.pow(pos2.z-pos1.z,2));
      line.addPointXY(x,dist);
      x=x+0.5;
      myPanel.addElement(line);
    }
  }, 200);
}

function setAxis(myPanel){
  var axisX = myPanel.createLine();
  axisX.setStartPointXY(20,10);
  axisX.setEndPointXY(20,100);
  myPanel.addElement(axisX);
  var axisY = myPanel.createLine();
  axisY.setStartPointXY(20,100);
  axisY.setEndPointXY(500,100);
  myPanel.addElement(axisY);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(50,100));
  myLabel.setText("00:10");
  myPanel.addElement(myLabel);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(150,100));
  myLabel.setText("00:30");
  myPanel.addElement(myLabel);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(250,100));
  myLabel.setText("01:00");
  myPanel.addElement(myLabel);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(0,10));
  myLabel.setText("10");
  myPanel.addElement(myLabel);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(0,30));
  myLabel.setText("30");
  myPanel.addElement(myLabel);
  var myLabel2 = myPanel.createLabel();
  myLabel2.setLocation(new jsgl.Vector2D(0,60));
  myLabel2.setText("60");
  myPanel.addElement(myLabel2);
}


function setTime(robotID){
  /**This function do a cronometer and put it in index.html
  */
  let robot=Websim.robots.getHalAPI(robotID)
  var time= document.getElementById("time");
  var id= setInterval(function(){
    if(robot.velocity.x>0){ // Maybe change the condition to when code is executed
      clearInterval(id);
      var timeInitial = new Date();
      setInterval(function(){
        var realTime = new Date(new Date() - timeInitial);
        var formatTime = timeFormatter(realTime);
        time.innerHTML = "Tiempo: " + formatTime;
      },500);
    }
  },500,robot,time);
}

function timeFormatter(time){
  var formatTime;
  if (time.getMinutes()<10){
    formatTime="0"+time.getMinutes();
  }else{
    formatTime=time.getMinutes();
  }
  formatTime+=":";
  if (time.getSeconds()<10){
    formatTime+="0"+time.getSeconds();
  }else{
    formatTime+=time.getSeconds();
  }
  return formatTime;
}

module.exports = evaluator;
