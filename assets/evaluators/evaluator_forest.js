var evaluator = {};

var timeInit;
var clock;

evaluator.createInterface= ()=>{
  /**
  *This function do a progress bar and text how much percent walked each robot
  */
  var node = document.createElement("div");
  node.setAttribute("class","evaluator");
  var img1 = document.createElement("img");
  img1.setAttribute("class","carMarker");
  img1.setAttribute("src","../assets/resources/car1.svg")
  node.appendChild(img1);
  var node2 = document.createElement("div");
  node2.setAttribute("id","car1Progress");
  var node3 = document.createElement("div");
  node3.setAttribute("id","a-car1bar");
  node3.innerHTML = "0%";
  node2.appendChild(node3);
  node.appendChild(node2);
  var img2 = document.createElement("img");
  img2.setAttribute("class","carMarker");
  img2.setAttribute("src","../assets/resources/car2.svg")
  node.appendChild(img2);
  var node4 = document.createElement("div");
  node4.setAttribute("id","car2Progress");
  var node5 = document.createElement("div");
  node5.setAttribute("id","a-car2bar");
  node5.innerHTML = "0%";
  node4.appendChild(node5);
  node.appendChild(node4);
  var time = document.createElement("div");
  time.setAttribute("id","time");
  time.innerHTML="Tiempo: 00:00";
  time.style.marginTop="-87px";
  time.style.color="white";
  node.appendChild(time);
  var myiframe= document.getElementById("myIFrame");
  myiframe.insertBefore(node,myiframe.childNodes[0]);
}

evaluator.setEvaluator = (arrayRobots) =>{
  /**This function do a cronometer and put it in index.html
  */
  let robot=Websim.robots.getHalAPI(arrayRobots[0]);
  if(!clock){
    timeInit = new Date();
  }
  if(robot.velocity.x>0){
    clock=true;
    var time= document.getElementById("time");
    progressBar(arrayRobots);
    var realTime = new Date(new Date() - timeInit);
    var formatTime = timeFormatter(realTime);
    time.innerHTML = "Tiempo: " + formatTime;
  }
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

function progressBar(arrayRobots){
  /**
  *This function do a progress bar and text how much percent walked each robot
  */
  arrayRobots.forEach(function(robotID){
    let robot = Websim.robots.getHalAPI(robotID);
    var left=38.24 + robot.getPosition().x;
    var completed=(left*100)/78.48;
    var element = document.getElementById(robot.myRobotID+"bar");
    if((100-completed)>100){
      element.style.width = 100 + '%';
      element.innerHTML = 100 + '%';
    }else{
      element.style.width = Math.round(100-completed) + '%';
      element.innerHTML = Math.round(100-completed) + '%';
    }
  });
}

module.exports = evaluator;
