class RobotIWW {
    constructor(robotId) {
      this.finished = {status:false};
      console.log("constructor " + robotId);

      this.myRobotID = robotId;
      this.sensors = {
                      velocity:{x: 0, y: 0, z: 0, ax: 0, ay: 0, az: 0},
                      position:{x: 0, y: 0, z: 0},
                      rotation:{x: 0, y: 0, z: 0},
                      distanceArray:10,
                      object:0,
                      camera:[],
                    }
      this.handlerMessages(this.finished,this.sensors,this);
    }

  handlerMessages(finished,sensors,classWW){
    onmessage= function(e){
      switch (e.data.message) {
        case "finished":
          break;
        case "sensor":
          if(e.data.function == "getV" || e.data.function == "getW" || e.data.function == "getL"){
            sensors.velocity = e.data.parameter;
          }else if(e.data.function == "getDistance" || e.data.function == "getDistances"){
            sensors.distanceArray = e.data.parameter;
          }else if(e.data.function == "getPosition"){
            sensors.position = e.data.parameter;
          }else if(e.data.function == "getRotation"){
            sensors.rotation = e.data.parameter;
          }
          break;
        case "camera":
          sensors.object = e.data.parameter;
          break;
        case "image":
          sensors.camera = e.data.parameter;
          break;
        case "stopping_code":
          var threadWorker = worker.threadsWorker.find((threadsWorker)=> threadsWorker.id == e.data.robotID);
          stopTimeoutRequested = true;
          clearTimeout(threadWorker.iteration);
          threadWorker.running = false;
          break;
        case "resume_code":
          var code = cleanCode(e.data.code);
          code = 'async function myAlgorithm(){\n'+code+'\n}\nmyAlgorithm();';
          var threadsWorker = worker.threadsWorker.find((threadsWorker)=> threadsWorker.id == e.data.robotID);
          threadsWorker.iteration = createTimeoutWorker(code,classWW,e.data.robotID);
          threadsWorker.running = true;
          threadsWorker.codeRunning = code;
          break;
        default:
          console.log("Mensaje recibido en interfaceWW: " + e.data);
      }
      finished.status=true;
    }
  }


  async  getRotation() {
    postMessage({message:"sensor",function:"getRotation"});
    this.finished.status=false;
    while(!finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.rotation;
  }

  setV(v) {
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
    postMessage({message:"move",v:v,w:w*10,h:h});
  }

  async getV() {
    postMessage({message:"sensor",function:"getV"})
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.velocity;
  }

  async getW() {
    postMessage({message:"sensor",function:"getW"})
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.velocity;
  }

  async getL() {
    postMessage({message:"sensor",function:"getL"});
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.velocity;
  }

  async getDistance() {
    postMessage({message:"sensor",function:"getDistance"});
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.distanceArray;
  }

  async getDistances() {
    postMessage({message:"sensor",function:"getDistances"});
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.distanceArray;
  }

  async getPosition() {
    postMessage({message:"sensor",function:"getPosition"});
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.position;
  }

  async getObjectColor(colorAsString){
    postMessage({message:"camera",function:"getObjectColor",color:colorAsString});
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.object;
  }

  dameObjeto(lowFilter, highFilter) {
      return this.getObjectColorRGB(lowFilter, highFilter);
  }

  async getObjectColorRGB(lowval, highval) {
    postMessage({message:"cameraRGB",function:"getObjectColorRGB",color:[lowval,highval]});
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.object;
  }


  async readIR(reqColor) {
    postMessage({message:"camera",function:"readIR",color:reqColor});
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.object;
  }

  async getImage(camaraID){
    postMessage({message:"image",function:"getImage",id:cameraID});
    this.finished.status=false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
    return this.sensors.camera;
  }

  avanzar(linearSpeed) {
    postMessage({message:"lineal",function:"setV",parameter: linearSpeed});
  }

  async avanzarHasta(distance){
    this.advanceTo(distance);
  }

  async advanceTo(distance) {
    postMessage({message:"avanzar", parameter:distance});
    this.finished.status = false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
  }

  async turnUpTo(angle) {
    postMessage({message:"girar",parameter:angle});
    this.finished.status = false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
  }

  async land() {
    postMessage({message:"aterrizar"});
    this.finished.status = false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
  }

  async takeOff() {
    postMessage({message:"despegar"});
    this.finished.status = false;
    while(!this.finished.status){
      await this.sleep(0.1);
    }
  }
  /*
    SPANISH API: This methods calls the same method in english
  */

  parar() {
    postMessage({message:"move",v:0,w:0,h:0});
  }

  async despegar(){
    this.takeOff();
  }

 async aterrizar(){
        this.land();
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

  async girarHasta(angle){
    this.turnUpTo(angle);
  }

  girar(turningSpeed) {
        postMessage({message:"lineal",function:"setW",parameter: turningSpeed});
  }

  leerUltrasonido() {
      return this.getDistance();
  }

  dameImagen() {
      return this.getImage();
  }

  sleep(s) {
    var ms = s*1000;
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
