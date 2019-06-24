

export default function initTurnLeftBlock(){
  var turnLeftBlock = {
    "type": "turn_left",
    "message0": "%{BKY_TURN_LEFT_TEXT}",
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
    "tooltip": "%{BKY_TURN_LEFT_TOOLTIP}",
    "helpUrl": ""
  }

  Blockly.Blocks['turn_left'] = {
    init: function() {
      this.jsonInit(turnLeftBlock);

    }
  };

  Blockly.JavaScript['turn_left'] = function(block) {
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);

    var code = variable_name + '.setW(' + value_robotvar + '); \n';
    return code;
  };

  Blockly.Python['turn_left'] = function(block) {
    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var value_robotvar = Blockly.Python.valueToCode(block, 'ROBOTVAR', Blockly.Python.ORDER_ATOMIC);

    var code = variable_name + '.girarIzquierda(' + value_robotvar + ')\r\n';
    return code;
  };
}
