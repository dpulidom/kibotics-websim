
export default function initGetAngularSpeedBlock(){
  var getAngular = {
    "type": "getAngularSpeed",
    "message0": "%{BKY_GETANGULARSPEED_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROBOT_MOTORS_HUE}",
    "tooltip": "%{BKY_GETANGULARSPEED_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['getAngularSpeed'] = {
    init: function() {
      this.jsonInit(getAngular);
    }
  };

  Blockly.JavaScript['getAngularSpeed'] = function(block) {
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = 'await ' + variable_robotvar + '.getW()';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
}
