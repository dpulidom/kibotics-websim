export function runEvaluator(arrayRobots){
  setInterval(progressBar,500,arrayRobots);
  setTime(arrayRobots[0]);
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
      },100);
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
