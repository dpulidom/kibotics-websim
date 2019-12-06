
export default function initSetLateralSpeedBlock(){
  var setLateralBlock = {
    "type": "set_lateral",
    "message0": "%{BKY_SET_LATERAL_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOT_VAR",
        "variable": "myRobot"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_MOTORS_HUE}",
    "tooltip": "%{BKY_SET_LATERAL_TOOLTIP}",
    "helpUrl": ""
  }

  Blockly.Blocks['set_lateral'] = {
    init: function() {
      this.jsonInit(setLateralBlock);

    }
  };

  Blockly.JavaScript['set_lateral'] = function(block) {
    let robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
    let value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    let code = robotvar + '.setL(' + value + '); \n';
    return code;
  };

}
