
export default function initMoveForwardBlock(){
  var moveForwardBlock = {
    "type": "move_forward",
    "message0": "%{BKY_MOVE_FORWARD_TEXT}",
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
    "tooltip": "%{BKY_MOVE_FORWARD_TOOLTIP}",
    "helpUrl": ""
  }

  Blockly.Blocks['move_forward'] = {
    init: function() {
      this.jsonInit(moveForwardBlock);

    }
  };

  Blockly.JavaScript['move_forward'] = function(block) {
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);

    var code = variable_name + '.setV(' + value_robotvar + '); \n';
    return code;
  };

  Blockly.Python['move_forward'] = function(block) {
    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var value_robotvar = Blockly.Python.valueToCode(block, 'ROBOTVAR', Blockly.Python.ORDER_ATOMIC);

    var code = variable_name + '.avanzar(' + value_robotvar + ')\r\n';
    return code;
  };
}
