!function(e){var t={};function l(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.m=e,l.c=t,l.d=function(e,t,o){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(l.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(o,a,function(t){return e[t]}.bind(null,a));return o},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="",l(l.s=0)}([function(e,t,l){"use strict";function o(e,t){if(null!=t){var l=Blockly.Xml.textToDom(t);Blockly.Xml.domToWorkspace(l,e),console.log("Code injected into workspace")}return e}function a(e){var t=new WebSocket(e);return t.onopen=function(e){console.log("Conexión WS establecida con el Servidor"),document.getElementById("saveCode").disabled=!1},t.onmessage=function(e){console.log("MESSAGE")},t.onerror=function(e){console.error(e.data)},t.onclose=function(e){!function(e){console.error(e.data),console.log("Cierre de conexión WebSockets detectado. Intentando Reconectar."),document.getElementById("saveCode").disabled=!0,setTimeout(function(){a(wsUri)},500)}(e)},t}l.r(t);var n="",i=window.wsUri;console.log("-----===================---------------------------------"),console.log("@@@@@@@@@"+i),console.log("----------------------===========----------------");var r=window.userCode,c="";$(document).ready(()=>{!function(){R={type:"getAngularSpeed",message0:"Get angular speed for %1",args0:[{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"}],output:null,colour:"%{BKY_MATH_HUE}",tooltip:"",helpUrl:""},Blockly.Blocks.getAngularSpeed={init:function(){this.jsonInit(R)}},Blockly.JavaScript.getAngularSpeed=function(e){return[Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE)+".getW()",Blockly.JavaScript.ORDER_ATOMIC]},O={type:"logs",message0:"Print log %1",args0:[{type:"input_value",name:"TO_LOG"}],previousStatement:null,nextStatement:null,colour:"%{BKY_LOOPS_HUE}",tooltip:"",helpUrl:""},Blockly.Blocks.logs={init:function(){this.jsonInit(O)}},Blockly.JavaScript.logs=function(e){return"console.log("+Blockly.JavaScript.valueToCode(e,"TO_LOG",Blockly.JavaScript.ORDER_ATOMIC)+");\n"},Blockly.Python.logs=function(e){return"print ("+Blockly.Python.valueToCode(e,"TO_LOG",Blockly.Python.ORDER_ATOMIC)+")\r\n"},g={type:"get_distance",message0:"Get distance for %1",args0:[{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"}],output:null,colour:"%{BKY_VARIABLES_DYNAMIC_HUE}",tooltip:"Returns distance for raycaster in the center",helpUrl:""},Blockly.Blocks.get_distance={init:function(){this.jsonInit(g)}},Blockly.JavaScript.get_distance=function(e){return[Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE)+".getDistance()",Blockly.JavaScript.ORDER_NONE]},Blockly.Python.get_distance=function(e){return[Blockly.Python.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE)+".leerUltrasonido()\r\n",Blockly.Python.ORDER_NONE]},m={type:"get_distances",message0:"Get distances for %1",args0:[{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"}],output:null,colour:"%{BKY_VARIABLES_DYNAMIC_HUE}",tooltip:"Returns an array of distances for raycasters",helpUrl:""},Blockly.Blocks.get_distances={init:function(){this.jsonInit(m)}},Blockly.JavaScript.get_distances=function(e){return[Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE)+".getDistances()",Blockly.JavaScript.ORDER_NONE]},k={type:"get_image",message0:"Get %1 camera image",args0:[{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"}],output:null,colour:"%{BKY_LISTS_HUE}",tooltip:"Gets image from robot camera",helpUrl:""},Blockly.Blocks.get_image={init:function(){this.jsonInit(k)}},Blockly.JavaScript.get_image=function(e){return[Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE).toString()+".getImage()",Blockly.JavaScript.ORDER_ATOMIC]},Blockly.Python.get_image=function(e){return[Blockly.Python.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE)+".leerIRSigueLineas()\r\n",Blockly.Python.ORDER_ATOMIC]},d={type:"getLateralSpeed",message0:"Get Lateral speed for %1",args0:[{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"}],output:null,colour:"%{BKY_MATH_HUE}",tooltip:"",helpUrl:""},Blockly.Blocks.getLateralSpeed={init:function(){this.jsonInit(d)}},Blockly.JavaScript.getLateralSpeed=function(e){return[Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE)+".getL()",Blockly.JavaScript.ORDER_ATOMIC]},_={type:"getLinearSpeed",message0:"Get linear speed for %1",args0:[{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"}],output:null,colour:"%{BKY_MATH_HUE}",tooltip:"",helpUrl:""},Blockly.Blocks.getLinearSpeed={init:function(){this.jsonInit(_)}},Blockly.JavaScript.getLinearSpeed=function(e){return[Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE)+".getV()",Blockly.JavaScript.ORDER_ATOMIC]},v={type:"get_objcolor",message0:"For %1 get %2 for the object with color %3",args0:[{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"},{type:"field_dropdown",name:"OPTIONS",options:[["centerX","X"],["centerY","Y"],["area","AREA"]]},{type:"field_input",name:"COLOUR",text:"blue"}],output:null,colour:"%{BKY_LISTS_HUE}",tooltip:"Get center and area of object with given color",helpUrl:""},Blockly.Blocks.get_objcolor={init:function(){this.jsonInit(v)}},Blockly.JavaScript.get_objcolor=function(e){var t=Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE),l=e.getFieldValue("OPTIONS"),o=e.getFieldValue("COLOUR");return["X"===l?t+'.getObjectColor("'+o+'").center[0];\n':"Y"===l?t+'.getObjectColor("'+o+'").center[1];\n':t+'.getObjectColor("'+o+'").area;\n',Blockly.JavaScript.ORDER_ATOMIC]},Blockly.Python.get_objcolor=function(e){var t=Blockly.Python.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE),l=e.getFieldValue("OPTIONS"),o=e.getFieldValue("COLOUR");return["X"===l?t+'.damePosicionDeObjetoDeColor("'+o+'")[0][0];\n':"Y"===l?t+'.damePosicionDeObjetoDeColor("'+o+'")[0][1];\n':t+'.damePosicionDeObjetoDeColor("'+o+'")[1];\n',Blockly.Python.ORDER_NONE]},B={type:"get_position",message0:"Get %1 coordinate for %2",args0:[{type:"field_dropdown",name:"POSITION_OPTIONS",options:[["x","POSX"],["y","POSY"],["z","POSZ"],["theta","ROTATION"]]},{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"}],output:null,colour:"%{BKY_VARIABLES_DYNAMIC_HUE}",tooltip:"Returns coordinate X, Y or Z for the robot. The X and Z coordinates represent the horizontal plane,",helpUrl:""},Blockly.Blocks.get_position={init:function(){this.jsonInit(B)}},Blockly.JavaScript.get_position=function(e){var t=e.getFieldValue("POSITION_OPTIONS"),l=Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE);return["POSX"===t?l+".getPosition().x":"POSY"===t?l+".getPosition().z":"POSZ"===t?l+".getPosition().y":l+".getPosition().theta",Blockly.JavaScript.ORDER_ATOMIC]},p={type:"getRotation",message0:"Get Rotation for %1",args0:[{type:"field_variable",name:"ROBOTVAR",variable:"myRobot"}],output:null,colour:"%{BKY_VARIABLES_DYNAMIC_HUE}",tooltip:"",helpUrl:""},Blockly.Blocks.getRotation={init:function(){this.jsonInit(p)}},Blockly.JavaScript.getRotation=function(e){return[Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOTVAR"),Blockly.Variables.NAME_TYPE)+".getRotation()",Blockly.JavaScript.ORDER_ATOMIC]},y={type:"move_backward",message0:"Move backward %1 at speed %2",args0:[{type:"field_variable",name:"NAME",variable:"myRobot"},{type:"input_value",name:"ROBOTVAR",check:"Number"}],previousStatement:null,nextStatement:null,colour:"%{BKY_MATH_HUE}",tooltip:"Sets speed for the robot.",helpUrl:""},Blockly.Blocks.move_backward={init:function(){this.jsonInit(y)}},Blockly.JavaScript.move_backward=function(e){return Blockly.JavaScript.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".setV(-"+Blockly.JavaScript.valueToCode(e,"ROBOTVAR",Blockly.JavaScript.ORDER_ATOMIC)+"); \n"},Blockly.Python.move_backward=function(e){return Blockly.Python.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".retroceder("+Blockly.Python.valueToCode(e,"ROBOTVAR",Blockly.Python.ORDER_ATOMIC)+")\r\n"},s={type:"move_combined",message0:"Move %1 at linear speed %2 and turn at speed %3",args0:[{type:"field_variable",name:"NAME",variable:"myRobot"},{type:"input_value",name:"LINEARSPEED",check:"Number"},{type:"input_value",name:"ANGULARSPEED",check:"Number"}],inputsInline:!0,previousStatement:null,nextStatement:null,colour:"%{BKY_MATH_HUE}",tooltip:"Sets linear and angular speed for the robot.",helpUrl:""},Blockly.Blocks.move_combined={init:function(){this.jsonInit(s)}},Blockly.JavaScript.move_combined=function(e){return Blockly.JavaScript.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".move("+Blockly.JavaScript.valueToCode(e,"LINEARSPEED",Blockly.JavaScript.ORDER_ATOMIC)+","+Blockly.JavaScript.valueToCode(e,"ANGULARSPEED",Blockly.JavaScript.ORDER_ATOMIC)+"); \n"},Blockly.Python.move_combined=function(e){return Blockly.Python.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE),"Me han dicho que me mueva a linSpeed --\x3e "+Blockly.Python.valueToCode(e,"LINEARSPEED",Blockly.Python.ORDER_ATOMIC)+" y angSpeed --\x3e "+Blockly.Python.valueToCode(e,"ANGULARSPEED",Blockly.Python.ORDER_ATOMIC)+"\r\n"},u={type:"move_forward",message0:"Move forward %1 at speed %2",args0:[{type:"field_variable",name:"NAME",variable:"myRobot"},{type:"input_value",name:"ROBOTVAR",check:"Number"}],previousStatement:null,nextStatement:null,colour:"%{BKY_MATH_HUE}",tooltip:"Sets speed for the robot.",helpUrl:""},Blockly.Blocks.move_forward={init:function(){this.jsonInit(u)}},Blockly.JavaScript.move_forward=function(e){return Blockly.JavaScript.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".setV("+Blockly.JavaScript.valueToCode(e,"ROBOTVAR",Blockly.JavaScript.ORDER_ATOMIC)+"); \n"},Blockly.Python.move_forward=function(e){return Blockly.Python.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".avanzar("+Blockly.Python.valueToCode(e,"ROBOTVAR",Blockly.Python.ORDER_ATOMIC)+")\r\n"},c={type:"imgto_canvas",message0:"Print image on canvas %1 %2",args0:[{type:"field_input",name:"canvas_id",text:"outputCanvas"},{type:"input_value",name:"img_input"}],previousStatement:null,nextStatement:null,colour:"%{BKY_LOOPS_HUE}",tooltip:"",helpUrl:""},Blockly.Blocks.imgto_canvas={init:function(){this.jsonInit(c)}},Blockly.JavaScript.imgto_canvas=function(e){return'cv.imshow("'+e.getFieldValue("canvas_id")+'", '+Blockly.JavaScript.valueToCode(e,"img_input",Blockly.JavaScript.ORDER_ATOMIC)+");\n"},r={type:"read_ir",message0:"For  %1 read IR %2",args0:[{type:"field_variable",name:"ROBOT_VAR",variable:"myRobot"},{type:"input_value",name:"NAME"}],output:null,colour:"%{BKY_LISTS_HUE}",tooltip:"Returns 0/1/2/3 if IR sensors detect line",helpUrl:""},Blockly.Blocks.read_ir={init:function(){this.jsonInit(r)}},Blockly.JavaScript.read_ir=function(e){return[Blockly.JavaScript.variableDB_.getName(e.getFieldValue("ROBOT_VAR"),Blockly.Variables.NAME_TYPE)+".readIR("+Blockly.JavaScript.valueToCode(e,"NAME",Blockly.JavaScript.ORDER_ATOMIC)+")",Blockly.JavaScript.ORDER_ATOMIC]},Blockly.Python.read_ir=function(e){var t=Blockly.Python.variableDB_.getName(e.getFieldValue("ROBOT_VAR"),Blockly.Variables.NAME_TYPE);return Blockly.Python.valueToCode(e,"NAME",Blockly.Python.ORDER_ATOMIC),[t+".leerIRSigueLineas()\r\n",Blockly.Python.ORDER_ATOMIC]},i={type:"set_interval",message0:"Bucle infinito %1",args0:[{type:"input_statement",name:"TEXT"}],output:null,colour:"%{BKY_LOOPS_HUE}",tooltip:"Bucle infinto",helpUrl:""},Blockly.Blocks.set_interval={init:function(){this.jsonInit(i)}},Blockly.JavaScript.set_interval=function(e){return["setInterval(()=>{\n"+Blockly.JavaScript.statementToCode(e,"TEXT")+"},100);\n",Blockly.JavaScript.ORDER_ATOMIC]},Blockly.Python.set_interval=function(e){return["while True:\n"+Blockly.Python.statementToCode(e,"TEXT")+"\ntime.sleep(0.1)\n",Blockly.Python.ORDER_ATOMIC]},n={type:"set_timeout",message0:"Execute once after %1 miliseconds %2",args0:[{type:"field_number",name:"TIME",value:0,min:0},{type:"input_statement",name:"TEXT"}],output:null,colour:"%{BKY_LOOPS_HUE}",tooltip:"Execute code inside every given miliseconds",helpUrl:""},Blockly.Blocks.set_timeout={init:function(){this.jsonInit(n)}},Blockly.JavaScript.set_timeout=function(e){var t=e.getFieldValue("TIME");return["setTimeout(()=>{\n"+Blockly.JavaScript.statementToCode(e,"TEXT")+"},"+t+");\n",Blockly.JavaScript.ORDER_ATOMIC]},Blockly.Python.set_timeout=function(e){return"time.sleep("+parseInt(e.getFieldValue("TIME"))/1e3+")\n"+Blockly.Python.statementToCode(e,"TEXT")+"\r\n"},a={type:"stop_robot",message0:"%1 stop",args0:[{type:"field_variable",name:"NAME",variable:"myRobot"}],inputsInline:!0,previousStatement:null,nextStatement:null,colour:"%{BKY_MATH_HUE}",tooltip:"Stops the robot",helpUrl:""},Blockly.Blocks.stop_robot={init:function(){this.jsonInit(a)}},Blockly.JavaScript.stop_robot=function(e){return Blockly.JavaScript.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".move(0, 0);\n"},Blockly.Python.stop_robot=function(e){return Blockly.Python.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".parar()\r\n"},o={type:"turn_left",message0:"Turn left %1 at speed %2",args0:[{type:"field_variable",name:"NAME",variable:"myRobot"},{type:"input_value",name:"ROBOTVAR",check:"Number"}],previousStatement:null,nextStatement:null,colour:"%{BKY_MATH_HUE}",tooltip:"Sets speed for the robot.",helpUrl:""},Blockly.Blocks.turn_left={init:function(){this.jsonInit(o)}},Blockly.JavaScript.turn_left=function(e){return Blockly.JavaScript.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".setW("+Blockly.JavaScript.valueToCode(e,"ROBOTVAR",Blockly.JavaScript.ORDER_ATOMIC)+"); \n"},Blockly.Python.turn_left=function(e){return Blockly.Python.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".girarIzquierda("+Blockly.Python.valueToCode(e,"ROBOTVAR",Blockly.Python.ORDER_ATOMIC)+")\r\n"},l={type:"turn_right",message0:"Turn right %1 at speed %2",args0:[{type:"field_variable",name:"NAME",variable:"myRobot"},{type:"input_value",name:"ROBOTVAR",check:"Number"}],previousStatement:null,nextStatement:null,colour:"%{BKY_MATH_HUE}",tooltip:"Sets speed for the robot.",helpUrl:""},Blockly.Blocks.turn_right={init:function(){this.jsonInit(l)}},Blockly.JavaScript.turn_right=function(e){return Blockly.JavaScript.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".setW(-"+Blockly.JavaScript.valueToCode(e,"ROBOTVAR",Blockly.JavaScript.ORDER_ATOMIC)+");\r\n"},Blockly.Python.turn_right=function(e){return Blockly.Python.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".girarDerecha("+Blockly.Python.valueToCode(e,"ROBOTVAR",Blockly.Python.ORDER_ATOMIC)+")\r\n"},t={type:"wait_block",message0:"Wait (miliseconds) %1",args0:[{type:"input_value",name:"time_input"}],previousStatement:null,nextStatement:null,colour:"%{BKY_LOOPS_HUE}",tooltip:"",helpUrl:""},Blockly.Blocks.wait_block={init:function(){this.jsonInit(t)}},Blockly.JavaScript.wait_block=function(e){return"await sleep("+Blockly.JavaScript.valueToCode(e,"time_input",Blockly.JavaScript.ORDER_ATOMIC)+");\n"},Blockly.Python.wait_block=function(e){return"time.sleep("+Blockly.Python.valueToCode(e,"time_input",Blockly.Python.ORDER_ATOMIC)/1e3+")\r\n"},e={type:"set_lateral",message0:"Move lateral %1 at speed %2",args0:[{type:"field_variable",name:"NAME",variable:"myRobot"},{type:"input_value",name:"ROBOTVAR",check:"Number"}],previousStatement:null,nextStatement:null,colour:"%{BKY_MATH_HUE}",tooltip:"Sets lateral speed for the robot.",helpUrl:""},Blockly.Blocks.set_lateral={init:function(){this.jsonInit(e)}},Blockly.JavaScript.set_lateral=function(e){return Blockly.JavaScript.variableDB_.getName(e.getFieldValue("NAME"),Blockly.Variables.NAME_TYPE)+".setL("+Blockly.JavaScript.valueToCode(e,"ROBOTVAR",Blockly.JavaScript.ORDER_ATOMIC)+"); \n"};var e;var t;var l;var o;var a;var n;var i;var r;var c;var u;var s;var y;var p;var B;var v;var _;var d;var k;var m;var g;var O;var R}(),n=o(n=function(e){return e=Blockly.inject("blockly-div",{media:"google-blockly/media/",toolbox:document.getElementById("toolbox"),zoom:{controls:!0,wheel:!0,startScale:1,maxScale:3,minScale:.3,scaleSpeed:1.2},trashcan:!0,horizontalLayout:!1,scrollbars:!0}),Blockly.JavaScript.INFINITE_LOOP_TRAP=null,e}(n),r),$("#cambtn").click(()=>{!function(){var e=document.querySelector("#outputCanvas"),t=document.querySelector("#cambtn").firstChild;$("#outputCanvas, #spectatorDiv").toggle(),"none"!=e.style.display?t.src="/static/websim/assets/resources/stop-camera-icon.png":t.src="/static/websim/assets/resources/play-camera-icon.png"}()}),$("#generator").click(()=>{showMe(n)}),$("#runbtn").click(()=>{var e=Blockly.JavaScript.workspaceToCode(n),t=new CustomEvent("code-to-run",{detail:{code:e}});document.dispatchEvent(t)}),$("#injectCode").click(()=>{n=o(n,r)}),$("#saveCode").click(()=>{!function(e,t){console.log("Getting code from the embedded editor.");var l=Blockly.Xml.workspaceToDom(e),o={type:"save",content:Blockly.Xml.domToText(l)};t.send(JSON.stringify(o))}(n,c)}),$("#blocklyToPython").click(()=>{!function(e,t){console.log("Getting code from the embedded editor.");var l={type:"websim",content:Blockly.Python.workspaceToCode(e)};console.log("Sending code to websocket"),t.send(JSON.stringify(l))}(n,c)}),$("#resetRobot").click(()=>{var e=new CustomEvent("reset",{detail:""});document.dispatchEvent(e)}),null!=i&&(c=a(i))})}]);