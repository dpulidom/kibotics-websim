
export default function initGetLateralSpeed(){
  var getLateral = {
    "type": "getLateralSpeed",
    "message0": "%{BKY_GETLATERALSPEED_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROBOT_MOTORS_HUE}",
    "tooltip": "%{BKY_GETLATERALSPEED_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['getLateralSpeed'] = {
    init: function() {
      this.jsonInit(getLateral);
    }
  };

  Blockly.JavaScript['getLateralSpeed'] = function(block) {
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = variable_robotvar + '.getL()';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
}
