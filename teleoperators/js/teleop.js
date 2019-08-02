var localRobot = null;


$(document).ready(()=>{
    $("#cambtn").click(()=>{
      toggleCameraDisplay();
    });

    $("#spectatorCamera").click(()=>{
      var subjCamera = document.querySelector("#subjCamera");
      var spectatorCamera = document.querySelector("#primaryCamera");
      var camera = subjCamera.getAttribute('camera','active');
      if(camera.active===true){
        spectatorCamera.setAttribute('camera', 'active', true);
      }else{
        subjCamera.setAttribute('camera', 'active', true);
      }
    });

  document.addEventListener('robot-loaded', (evt)=>{
    localRobot = evt.detail;
    console.log(localRobot);
    document.addEventListener("keydown", keypressHandler, false);
    document.addEventListener("keyup", keyupHandler, false);
    $("#speed").click(()=>{
      speed();
    });
    $("#brake").click(()=>{
      brake();
    });
    $("#left").click(()=>{
      left();
    });
    $("#right").click(()=>{
      right();
    });
    $("#up").click(()=>{
      up();
    });
    $("#down").click(()=>{
      down();
    });
    $("#takeOff").click(()=>{
      takeOff();
    });
    $("#land").click(()=>{
      land();
    });
  });

function keypressHandler(evt){
  if (evt.key == "i"){
    localRobot.setV(0.9);
  }else if(evt.key == "l"){
    localRobot.setW(-0.2);
  }else if(evt.key == "j"){
    localRobot.setW(0.2);
  }else if(evt.key == "k"){
    localRobot.setV(-0.9);
  }else if(evt.key == "u"){
    localRobot.setL(0.9);
  }else if(evt.key == "h"){
    localRobot.setL(-0.9);
  }else if(evt.key == "m"){
    localRobot.despegar();
  }else if(evt.key == "n"){
    localRobot.aterrizar();
  }
}

function keyupHandler(evt){
  if (evt.key == "i"){
    localRobot.setV(0);
  }else if(evt.key == "l"){
    localRobot.setW(0);
  }else if(evt.key == "j"){
    localRobot.setW(0);
  }else if(evt.key == "k"){
    localRobot.setV(0);
  }else if(evt.key == "u"){
    localRobot.setL(0);
  }else if(evt.key == "h"){
    localRobot.setL(0);
  }else if(evt.key == "m"){
    localRobot.setL(0);
  }else if(evt.key == "n"){
    localRobot.setL(0);
  }
}

function speed(){
  let velocity = localRobot.getV()
  localRobot.setV(velocity + 0.2);
}

function brake(){
  let velocity = localRobot.getV()
  localRobot.setV(velocity - 0.2);
}

function left(){
  let rotation = localRobot.getW()
  if(rotation<0){
    localRobot.setW(0);
  }else{
    localRobot.setW(0.2);
  }
}

function right(){
  let rotation = localRobot.getW()
  if(rotation>0){
    localRobot.setW(0);
  }else{
    localRobot.setW(-0.2);
  }}

function up(){
  let velocity = localRobot.getL()
  localRobot.setL(velocity + 0.2);
}

function down(){
  let velocity = localRobot.getL()
  localRobot.setL(velocity - 0.2);
}

function takeOff(){
  localRobot.despegar();
}

function land(){
  localRobot.aterrizar();
}

function toggleCameraDisplay(){
  var opencvCam = document.querySelector("#outputCanvas");
  var imageCamBtn = document.querySelector("#cambtn").firstChild;
  $("#outputCanvas, #spectatorDiv").toggle();
  if(opencvCam.style.display != "none"){
    imageCamBtn.src = "assets/resources/stop-camera-icon.png"
  }else{
    imageCamBtn.src = "assets/resources/play-camera-icon.png"
  }
}
});
