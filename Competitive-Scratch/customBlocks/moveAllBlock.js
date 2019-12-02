
export default function initMoveAllBlock(){
  var moveBlock = {
    "type": "move_combined_all",
    "message0": "%{BKY_MOVE_COMBINED_ALL_TEXT}",
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
      },
      {
        "type": "input_value",
        "name": "VERTICALSPEED",
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

  Blockly.Blocks['move_combined_all'] = {
    init: function() {
      this.jsonInit(moveBlock);

    }
  };

  Blockly.JavaScript['move_combined_all'] = function(block) {
    let variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    let value_linear = Blockly.JavaScript.valueToCode(block, 'LINEARSPEED', Blockly.JavaScript.ORDER_ATOMIC);
    let value_angular = Blockly.JavaScript.valueToCode(block, 'ANGULARSPEED', Blockly.JavaScript.ORDER_ATOMIC);
    let value_vertical = Blockly.JavaScript.valueToCode(block, 'VERTICALSPEED', Blockly.JavaScript.ORDER_ATOMIC);

    let code = variable_name + '.move(' + value_linear + ',' + value_angular + ',' + value_vertical + ',0); \n';
    return code;
  };

  Blockly.Python['move_combined_all'] = function(block) {
    let variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    let value_linear = Blockly.Python.valueToCode(block, 'LINEARSPEED', Blockly.Python.ORDER_ATOMIC);
    let value_angular = Blockly.Python.valueToCode(block, 'ANGULARSPEED', Blockly.Python.ORDER_ATOMIC);
    let value_vertical = Blockly.Python.valueToCode(block, 'VERTICALSPEED', Blockly.Python.ORDER_ATOMIC);


    let code = "Me han dicho que me mueva a linSpeed --> " + value_linear + ' angSpeed --> ' + value_angular + ' y vertSpeed --> ' + value_vertical + '\r\n';
    return code;
  };
}
