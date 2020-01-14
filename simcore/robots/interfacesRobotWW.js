class RobotIWW {
    constructor(robotId) {
      this.finished = false;
      this.myRobotID = robotId;
      this.velocity = {x: 0, y: 0, z: 0, ax: 0, ay: 0, az: 0};
      this.position = {x: 0, y: 0, z: 0};
      this.rotation = {x: 0, y: 0, z: 0};
      this.distanceArray = [];
      this.object;
      this.camera = [];
      this.handlerMessages();
    }

  handlerMessages(){
    onmessage= function(e){
      switch (e.data.message) {
        case "finished":
          console.log("posición alcanzada, desbloqueo worker");
          this.finished = true;
          break;
        case "velocidad":
          console.log("velocidad obtenida, desbloqueo worker");
          this.finished=true;
          if(e.data.function == "getV"){
            this.velocity = {x: e.data.parameter, y: 0, z: 0, ax: 0, ay: 0, az: 0};
            //this.velocity.x = e.data.parameter;
          }else if(e.data.function == "getW"){
            this.velocity = {x: 0, y: 0, z: 0, ax: 0, ay: e.data.parameter, az: 0};
            //this.velocity.ay = e.data.parameter;
          }else if(e.data.function == "getL"){
            this.velocity = {x: 0, y: e.data.parameter, z: 0, ax: 0, ay: 0, az: 0};
            //this.velocity.y = e.data.parameter;
          }
          break;
        case "sensor":
          this.finished = true;
          if(e.data.function == "getDistance" || e.data.function == "getDistances"){
            this.distanceArray = e.data.parameter;
            console.log(this.distanceArray);
          }else if(e.data.function == "getObjectColor" || e.data.function == "readIR"){
            this.object = e.data.parameter;
          }
          break;
        default:
          console.log("Otro mensaje");
      }
    }
  }
  async  getRotation() {
        /*
          Returns an object with rotation properties.
        */
        return this.robot.getAttribute('rotation');
    }


    setV(v) {
      console.log("llamo a halapiWW setV");
      postMessage({message:"lineal",function:"setV",parameter:v});
    }

    advance(linearSpeed){
      this.setV(linearSpeed);
    }

    setW(w) {
      postMessage({message:"lineal",function:"setW",parameter: w * 10});
    }

    setL(l) {
      postMessage({message:"lineal",function:"setL",parameter: l});
    }

    move(v, w, h) {
      postMessage({message:"move",function:"move",v:v,w:w*10,h:h});
    }

    async getV() {
      postMessage({message:"velocidad",function:"getV"})
      this.finished=false;
      var bucle=true;
      var velocity;
      while(bucle){
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
            velocity = this.velocity.x;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
      return velocity.resolve();
    }

    async getW() {
      postMessage({message:"velocidad",function:"getW"})
      this.finished=false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
            var velocity = this.velocity.ay;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
      return velocity.resolve();
    }

    async getL() {
      postMessage({message:"velocidad",function:"getL"});
      this.finished=false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
            var velocity = this.velocity.y;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
      console.log("devuelvo: ", velocity);
      return velocity.resolve();
    }

    async getDistance() {
    /*
      This function returns the distance for the raycaster in the center of the arc of rays.
    */
      postMessage({message:"sensor",function:"getDistance"});
      this.finished = false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
            var distance = this.distanceArray[0];
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
      return distance.resolve();
    }

    async getDistances() {
    /*
      This function returns an array with all the distances detected by the rays.
    */
      postMessage({message:"sensor",function:"getDistances"});
      this.finished=false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
            var distances = this.distanceArray;

          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
      return distances.resolve();
    }

    async getPosition() {
    /*
      This function returns an object with X-Y-Z positions and rotation (theta)
      for the Y axis.
    */
      postMessage({message:"sensor",function:"getPosition"});
      this.finished=false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
            var position = this.position;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
      return position.resolve();
    }


    async getObjectColor(colorAsString){
      console.log("llamo a funcion");
      postMessage({message:"sensor",function:"getObjectColor",color:colorAsString});
      this.finished=false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
            var objectPos = this.object;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
      return objectPos.resolve();
    }

    async getObjectColorRGB(lowval, highval) {
    /*
      This function filters an object in the scene with a given color, uses OpenCVjs to filter
      by color and calculates the center of the object.

      Returns center: CenterX (cx), CenterY (cy) and the area of the object detected in the image.
    */
        var image = this.getImage();
        var binImg = new cv.Mat();
        var M = cv.Mat.ones(5, 5, cv.CV_8U);
        var anchor = new cv.Point(-1, -1);
        var lowThresh = new cv.Mat(image.rows, image.cols, image.type(), lowval);
        var highThresh = new cv.Mat(image.rows, image.cols, image.type(), highval);
        var contours = new cv.MatVector();
        var hierarchy = new cv.Mat();

        cv.morphologyEx(image, image, cv.MORPH_OPEN, M, anchor, 2,
            cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue()); // Erosion followed by dilation

        cv.inRange(image, lowThresh, highThresh, binImg);
        cv.findContours(binImg, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
        if (contours.size() > 0) {

            let stored = contours.get(0);
            var objArea = cv.contourArea(stored, false);

            let moments = cv.moments(stored, false);
            var cx = moments.m10 / moments.m00;
            var cy = moments.m01 / moments.m00;

        }
        return {center: [parseInt(cx), parseInt(cy)], area: parseInt(objArea)};
    }


    async readIR(reqColor) {
      postMessage({message:"sensor",function:"readIR",color:reqColor});
      this.finished=false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
            var objectPos = this.object;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
      return objectPos.resolve();
    }


    avanzar(linearSpeed) {
      postMessage({message:"lineal",function:"setV",parameter: linearSpeed});
    }

    async avanzarHasta(distance){
      this.advanceTo(distance);
    }

    async advanceTo(distance) {
      postMessage({message:"avanzar", parameter:distance});
      this.finished = false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
    }

    girar(turningSpeed) {
      postMessage({message:"lineal",function:"setW",parameter: turningSpeed});
    }

    async girarHasta(angle){
      this.turnUpTo(angle);
    }

    async turnUpTo(angle) {
      postMessage({message:"girar",parameter:angle});
      this.finished = false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
    }

    async aterrizar(){
      this.land();
    }

    async land() {
      postMessage({message:"aterrizar"});
      this.finished = false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
    }

    async despegar(){
      this.takeOff();
    }

    async takeOff() {
      postMessage({message:"despegar"});
      this.finished = false;
      var bucle=true;
      while(bucle){
        console.log(this.finished);
        var interval = setInterval(function(){
          if(this.finished){
            bucle=false;
          }
          clearInterval(interval);
        },500);
        await this.sleep(0.1);
        console.log("-----Hilo dormido:worker");
      }
    }

    parar() {
      postMessage({message:"move",function:"move",v:0,w:0,h:0});
    }

    leerUltrasonido() {
        return this.getDistance();
    }

    dameObjeto(lowFilter, highFilter) {
        return this.getObjectColorRGB(lowFilter, highFilter);
    }

    dameImagen() {
        return this.getImage();
    }

    sleep(s) {
    /**
     * Auxiliar function to implement a throttle of code.
     *
     * @param {integer} s Number of seconds to stop the code
     */
      var ms = s*1000;
      return new Promise(resolve => setTimeout(resolve, ms));
  }
}
