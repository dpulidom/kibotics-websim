
export default function initRobotInstanceBlock(){
  /*var robotInstanceBlock = {
    "type": "robot_instance",
    "message0": "Create robot %1",
    "args0": [
      {
        "type": "field_input",
        "name": "ROBOT_ID",
        "text": "#a-pibot"
      }
    ],
    "output": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "",
    "helpUrl": ""
  };*/

  var robotInstanceBlock = {
    "type": "robot_instance",
    "message0": "Create robot %1",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOT_VAR",
        "variable": "myRobot"
      }
    ],
    "tooltip": "",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_MOTORS_HUE}",
    "helpUrl": ""
  };

  Blockly.Blocks['robot_instance'] = {
    init: function() {
      this.jsonInit(robotInstanceBlock);
    }
  };

  Blockly.JavaScript['robot_instance'] = function(block) {
    return ['', Blockly.JavaScript.ORDER_ATOMIC];
  };
  /*Blockly.JavaScript['robot_instance'] = function(block) {
    var text_robot_id = block.getFieldValue('ROBOT_ID');

    var code = 'new RobotI("' + text_robot_id + '")';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };*/

  Blockly.Python['robot_instance'] = function(block) {
 
    var variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE)
    var imports = 'from pibot.piBot import PiBot\r\n';
  
    var code = imports + '\n' + variable_robotvar  + ' = PiBot()\r\n';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };
}
