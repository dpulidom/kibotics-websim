function loadJSON(callback) {
   var xobj = new XMLHttpRequest();
   xobj.overrideMimeType("application/json");
   xobj.open('GET', config_file, true);
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
  }
  loadJSON(function(response) {
    var config = JSON.parse(response);
    var sceneEl = document.querySelector('a-scene');
    var robot = sceneEl.querySelector('#a-pibot');
    robot.setAttribute('gltf-model',config.robot.model);
    robot.setAttribute('scale',config.robot.scale);
    robot.setAttribute('position',config.robot.position);
    robot.setAttribute('rotation',config.robot.rotation);
    sceneEl.setAttribute('physics',config.physics);
    sceneEl.querySelector('#ground').setAttribute('src',config.ground);
    sceneEl.querySelector('#sky').setAttribute('src',config.sky);
    sceneEl.querySelector('#ground').setAttribute('src',config.ground);
    sceneEl.querySelector('#secondaryCamera').setAttribute('position',config.secondaryCamera);
 });
