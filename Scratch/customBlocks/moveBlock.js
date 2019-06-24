
export default function initMoveBlock(){
  var moveBlock = {
    "type": "move_combined",
    "message0": "%{BKY_MOVE_COMBINED_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "NAME",
        "variable": "myRobot"
      },
      {
        "type": "input_value",
        "name": "LINEARSPEED",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "ANGULARSPEED",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_MOTORS_HUE}",
    "tooltip": "%{BKY_MOVE_COMBINED_TOOLTIP}",
    "helpUrl": ""
  }

  Blockly.Blocks['move_combined'] = {
    init: function() {
      this.jsonInit(moveBlock);

    }
  };

  Blockly.JavaScript['move_combined'] = function(block) {
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var value_linear = Blockly.JavaScript.valueToCode(block, 'LINEARSPEED', Blockly.JavaScript.ORDER_ATOMIC);
    var value_angular = Blockly.JavaScript.valueToCode(block, 'ANGULARSPEED', Blockly.JavaScript.ORDER_ATOMIC);

    var code = variable_name + '.move(' + value_linear + ',' + value_angular + ',0); \n';
    return code;
  };

  Blockly.Python['move_combined'] = function(block) {
    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var value_linear = Blockly.Python.valueToCode(block, 'LINEARSPEED', Blockly.Python.ORDER_ATOMIC);
    var value_angular = Blockly.Python.valueToCode(block, 'ANGULARSPEED', Blockly.Python.ORDER_ATOMIC);

    var code = "Me han dicho que me mueva a linSpeed --> " + value_linear + ' y angSpeed --> ' + value_angular + '\r\n';
    return code;
  };
}
