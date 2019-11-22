var evaluator = {};

var car1;
var car2;
var timeInit;
var clock;

evaluator.createInterface=()=>{
  /**
  *This function do a progress bar and text how much percent walked each robot
  */
  var node = document.createElement("div");
  node.setAttribute("class","evaluator");
  var img1 = document.createElement("img");
  img1.setAttribute("class","carMarker");
  img1.setAttribute("src",evaluator_icon1)
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
  img2.setAttribute("src",evaluator_icon2)
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
  time.style.color="black";
  node.appendChild(time);
  var myiframe= document.getElementById("myIFrame");
  myiframe.insertBefore(node,myiframe.childNodes[0]);
}

evaluator.setEvaluator = (arrayRobots) => {
  /**This function do a cronometer and put it in index.html
  */
  let robot1=Websim.robots.getHalAPI(arrayRobots[0]);
  let robot2=Websim.robots.getHalAPI(arrayRobots[1]);
  if(!clock){
    timeInit = new Date();
    car1 = {
            pos:{
              x:robot1.getPosition().x,
              z:robot1.getPosition().z
            },
            dist: 0
            };
    car2={
        pos:{
          x:robot2.getPosition().x,
          z:robot2.getPosition().z
        },
        dist: 0
    }
  }else{
    var time= document.getElementById("time");
    progressBar(arrayRobots,[car1,car2]);
    var realTime = new Date(new Date() - timeInit);
    var formatTime = timeFormatter(realTime);
    time.innerHTML = "Tiempo: " + formatTime;
  }
  if(robot1.velocity.x>0 || robot2.velocity.x>0){
    clock=true;
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

function progressBar(arrayRobots,cars){
  /**
  *This function do a progress bar and text how much percent walked each robot
  */
  var i=0;
  arrayRobots.forEach(function(robotID){
    let robot = Websim.robots.getHalAPI(robotID);
    var posNow = {x:robot.getPosition().x,z:robot.getPosition().z};
    distNow =  Math.sqrt(Math.pow(cars[i].pos.x-posNow.x,2)+Math.pow(cars[i].pos.z-posNow.z,2));
    cars[i].pos=posNow;
    cars[i].dist=cars[i].dist+Math.abs(distNow);
    var completed = (cars[i].dist*100/190);
    var element = document.getElementById(robot.myRobotID+"bar");
    if(completed>100){
      element.style.width = 100 + '%';
      element.innerHTML = 100 + '%';
    }else{
      element.style.width = Math.round(completed) + '%';
      element.innerHTML = Math.round(completed) + '%';
    }
    i++;
  });
}

module.exports = evaluator;
