var evaluator = {};

evaluator.main= (arrayRobots)=>{
  createInterface();
  setEvaluator(arrayRobots);
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
  myLabel.setLocation(new jsgl.Vector2D(75,100));
  myLabel.setText("00:30");
  myPanel.addElement(myLabel);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(145,100));
  myLabel.setText("01:00");
  myPanel.addElement(myLabel);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(210,100));
  myLabel.setText("01:30");
  myPanel.addElement(myLabel);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(0,20));
  myLabel.setText("10");
  myPanel.addElement(myLabel);
  var myLabel = myPanel.createLabel();
  myLabel.setLocation(new jsgl.Vector2D(0,40));
  myLabel.setText("30");
  myPanel.addElement(myLabel);
  var myLabel2 = myPanel.createLabel();
  myLabel2.setLocation(new jsgl.Vector2D(0,60));
  myLabel2.setText("50");
  myPanel.addElement(myLabel2);
}

function setEvaluator(arrayRobots){
  /**This function do a cronometer and graphic and put it in index.html
  */
  myPanel = new jsgl.Panel(document.getElementById("panel"));
  setAxis(myPanel);
  var line = myPanel.createPolyline();
  line.getStroke().setColor('blue');
  line.getStroke().setWeight(2);
  var x= 20;
  var robot1 = Websim.robots.getHalAPI(arrayRobots[0]);
  var robot2 = Websim.robots.getHalAPI(arrayRobots[1]);
  var time= document.getElementById("time");
  var id= setInterval(function(){
    if(robot1.velocity.x>0){
      clearInterval(id);
      var timeInitial = new Date();
      setInterval(function(){
        var realTime = new Date(new Date() - timeInitial);
        var formatTime = timeFormatter(realTime);
        time.innerHTML = "Tiempo: " + formatTime;
        if(robot1.velocity.x >0 || robot2.velocity.x>0){
          var pos1 = robot1.getPosition();
          var pos2 = robot2.getPosition();
          var dist = Math.sqrt(Math.pow(pos2.x-pos1.x,2)+Math.pow(pos2.y-pos1.y,2)+Math.pow(pos2.z-pos1.z,2));
          line.addPointXY(x,dist+10);
          x=x+0.5;
          myPanel.addElement(line);
        }
      },200);
    }
  },500,robot1,time);
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
