
export default function initGetRotationBlock(){
  var getRotation = {
    "type": "getRotation",
    "message0": "Get Rotation for %1",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "output": null,
    "colour": "%{BKY_VARIABLES_DYNAMIC_HUE}",
    "tooltip": "",
    "helpUrl": ""
  };

  Blockly.Blocks['getRotation'] = {
    init: function() {
      this.jsonInit(getRotation);
    }
  };

  Blockly.JavaScript['getRotation'] = function(block) {
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = 'await ' + variable_robotvar + '.getRotation()';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
}
