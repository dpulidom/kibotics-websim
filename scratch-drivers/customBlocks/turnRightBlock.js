
export default function initTurnRightBlock(){
  var turnRightBlock = {
    "type": "turn_right",
    "message0": "%{BKY_TURN_RIGHT_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "NAME",
        "variable": "myRobot"
      },
      {
        "type": "input_value",
        "name": "ROBOTVAR",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_MOTORS_HUE}",
    "tooltip": "%{BKY_TURN_RIGHT_HUE}",
    "helpUrl": ""
  }

  Blockly.Blocks['turn_right'] = {
    init: function() {
      this.jsonInit(turnRightBlock);

    }
  };

  Blockly.JavaScript['turn_right'] = function(block) {
    let variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    let value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);

    let code = variable_name + '.setW(-' + value_robotvar + ');\r\n';
    return code;
  };

  Blockly.Python['turn_right'] = function(block) {
    let variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    let value_robotvar = Blockly.Python.valueToCode(block, 'ROBOTVAR', Blockly.Python.ORDER_ATOMIC);

    let code = variable_name + '.girarDerecha(' + value_robotvar + ')\r\n';
    return code;
  };
}
