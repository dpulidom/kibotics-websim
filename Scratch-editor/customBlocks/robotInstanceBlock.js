
export default function initRobotInstanceBlock(){
  var robotInstanceBlock = {
    "type": "robot_instance",
    "message0": "Create robot %1",
    "args0": [
      /*{
        "type": "field_variable",
        "name": "ROBOT_VAR",
        "variable": "myRobot"
      },*/
      {
        "type": "field_dropdown",
        "name": "OPTIONS",
        "options": [
          [
            "PiBot",
            "pibot"
          ],
          [
            "Tello",
            "tello"
          ]
        ]
      }
    ],
    "output": null,
    "tooltip": "",
    "colour": "%{BKY_ROBOT_MOTORS_HUE}",
    "helpUrl": ""
  };

  Blockly.Blocks['robot_instance'] = {
    init: function() {
      this.jsonInit(robotInstanceBlock);
    }
  };

  Blockly.JavaScript['robot_instance'] = function(block) {
    return ["myRobot"];
  };
  /*Blockly.JavaScript['robot_instance'] = function(block) {
    var text_robot_id = block.getFieldValue('ROBOT_ID');

    var code = 'new RobotI("' + text_robot_id + '")';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };*/

  Blockly.Python['robot_instance'] = function(block) {
 
    var dropdown_options = Blockly.Python.variableDB_.getName(block.getFieldValue('OPTIONS'), Blockly.Variables.NAME_TYPE)
    
    if(dropdown_options === "pibot"){
      var code = 'PiBot()\r\n';

    }else if(dropdown_options === "tello"){
      var code = 'Tello("",9500)\r\n';
    } 

    return code;
  };
}
