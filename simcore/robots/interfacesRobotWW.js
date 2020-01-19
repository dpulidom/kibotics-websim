class RobotIWW {
    constructor(robotId) {
        this.finished = false;
        this.myRobotID = robotId;
        this.velocity = {
            x: 0,
            y: 0,
            z: 0,
            ax: 0,
            ay: 0,
            az: 0
        };
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };
        this.distanceArray = 10;
        this.object;
        this.camera = [];
        this.handlerMessages();
    }

    handlerMessages() {
        onmessage = function(e) {
            switch (e.data.message) {
                case "finished":
                    break;
                case "sensor":
                    if (e.data.function == "getV" || e.data.function == "getW" || e.data.function == "getL") {
                        this.velocity = e.data.parameter;
                    } else if (e.data.function == "getDistance" || e.data.function == "getDistances") {
                        this.distanceArray = e.data.parameter;
                    } else if (e.data.function == "getPosition") {
                        this.position = e.data.parameter;
                    } else if (e.data.function == "getRotation") {
                        this.rotation = e.data.parameter;
                    }
                    break;
                case "camera":
                    this.object = e.data.parameter;
                    break;
                case "image":
                    this.camera = e.data.parameter;
                    break;
                default:
                    console.log("Mensaje recibido: " + e.data);
            }
            this.finished = true;
        }
    }

    async getRotation() {
        postMessage({
            message: "sensor",
            function: "getRotation"
        });
        this.finished = false;
        var bucle = true,
            rotation;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                rotation = this.rotation;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return rotation;
    }

    setV(v) {
        postMessage({
            message: "lineal",
            function: "setV",
            parameter: v
        });
    }

    advance(linearSpeed) {
        this.setV(linearSpeed);
    }

    setW(w) {
        postMessage({
            message: "lineal",
            function: "setW",
            parameter: w * 10
        });
    }

    setL(l) {
        postMessage({
            message: "lineal",
            function: "setL",
            parameter: l
        });
    }

    move(v, w, h) {
        postMessage({
            message: "move",
            v: v,
            w: w * 10,
            h: h
        });
    }


    async getV() {
        postMessage({
            message: "sensor",
            function: "getV"
        })
        this.finished = false;
        var bucle = true,
            velocity;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                velocity = this.velocity;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return velocity;
    }

    async getW() {
        postMessage({
            message: "sensor",
            function: "getW"
        })
        this.finished = false;
        var bucle = true,
            velocity;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                velocity = this.velocity;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return velocity;
    }

    async getL() {
        postMessage({
            message: "sensor",
            function: "getL"
        });
        this.finished = false;
        var bucle = true,
            velocity;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                velocity = this.velocity;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return velocity;
    }

    async getDistance() {
        postMessage({
            message: "sensor",
            function: "getDistance"
        });
        this.finished = false;
        var bucle = true,
            distance;
        var interval = setInterval(function() {
            if (this.finished) {
                distance = this.distanceArray;
                bucle = false;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return distance;
    }

    async getDistances() {
        postMessage({
            message: "sensor",
            function: "getDistances"
        });
        this.finished = false;
        var bucle = true,
            distance;
        var interval = setInterval(function() {
            if (this.finished) {
                distance = this.distanceArray;
                bucle = false;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return distance;
    }


    async getPosition() {
        postMessage({
            message: "sensor",
            function: "getPosition"
        });
        this.finished = false;
        var bucle = true,
            position;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                position = this.position;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return position;
    }

    async getObjectColor(colorAsString) {
        postMessage({
            message: "camera",
            function: "getObjectColor",
            color: colorAsString
        });
        this.finished = false;
        var bucle = true,
            objectPos;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                objectPos = this.object;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return objectPos;
    }


    dameObjeto(lowFilter, highFilter) {
        return this.getObjectColorRGB(lowFilter, highFilter);
    }

    async getObjectColorRGB(lowval, highval) {
        postMessage({
            message: "cameraRGB",
            function: "getObjectColorRGB",
            color: [lowval, highval]
        });
        this.finished = false;
        var bucle = true,
            objectPos;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                objectPos = this.object;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return objectPos;
    }



    async readIR(reqColor) {
        postMessage({
            message: "camera",
            function: "readIR",
            color: reqColor
        });
        this.finished = false;
        var bucle = true,
            objectPos;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                objectPos = this.object;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return objectPos;
    }

    async getImage(camaraID) {
        postMessage({
            message: "image",
            function: "getImage",
            id: cameraID
        });
        this.finished = false;
        var bucle = true,
            camera;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
                camera = this.camera;
            }
        }, 500);
        while (bucle) {
            await this.sleep(0.1);
            //console.log("-----Hilo dormido:worker");
        }
        clearInterval(interval);
        return camera;
    }

    avanzar(linearSpeed) {
        postMessage({
            message: "lineal",
            function: "setV",
            parameter: linearSpeed
        });
    }

    async avanzarHasta(distance) {
        await this.advanceTo(distance);
    }

    async advanceTo(distance) {
        postMessage({
            message: "avanzar",
            parameter: distance
        });
        await this.loopWorker();
    }

    async turnUpTo(angle) {
        postMessage({
            message: "girar",
            parameter: angle
        });
        await this.loopWorker();
    }

    async land() {
        postMessage({
            message: "aterrizar"
        });
        await this.loopWorker();
    }

    async takeOff() {
        postMessage({
            message: "despegar"
        });
        await this.loopWorker();
    }
    /*
      SPANISH API: This methods calls the same method in english
    */

    parar() {
        postMessage({
            message: "move",
            v: 0,
            w: 0,
            h: 0
        });
    }

    async despegar() {
        this.takeOff();
    }

    async aterrizar() {
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

    async girarHasta(angle) {
        this.turnUpTo(angle);
    }

    girar(turningSpeed) {
        postMessage({
            message: "lineal",
            function: "setW",
            parameter: turningSpeed
        });
    }

    leerUltrasonido() {
        return this.getDistance();
    }

    dameImagen() {
        return this.getImage();
    }

    sleep(s) {
        var ms = s * 1000;
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async loopWorker() {
        this.finished = false;
        var bucle = true;
        var interval = setInterval(function() {
            if (this.finished) {
                bucle = false;
            }
        }, 250);
        while (bucle) {
            await this.sleep(0.1);
        }
        clearInterval(interval);
    }

}
