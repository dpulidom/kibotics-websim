
export default function initStopRaycastersBlock(){
  var stopRaycastersBlock = {
    "type": "stop_rays",
    "message0": "%1 Stop rays",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_VARIABLES_DYNAMIC_HUE}",
    "tooltip": "Stop all raycasters.",
    "helpUrl": ""
  };

  Blockly.Blocks['stop_rays'] = {
    init: function() {
      this.jsonInit(stopRaycastersBlock);
    }
  };

  Blockly.JavaScript['stop_rays'] = function(block) {
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
    let code = variable_robotvar + '.stopRaycasters();\n';
    return code;
  };
}
