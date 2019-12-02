
export default function initToggleCameraBlock(){
  var toggleCameraBlock = {
    "type": "toggle_camera",
    "message0": "%{BKY_TOGGLE_CAMERA_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_CAMERA_HUE}",
    "tooltip": "%{BKY_TOGGLE_CAMERA_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['toggle_camera'] = {
    init: function() {
      this.jsonInit(toggleCameraBlock);

    }
  };

  Blockly.JavaScript['toggle_camera'] = function(block) {
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = variable_robotvar.toString() + '.toggleCamera()';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.Python['toggle_camera'] = function(block) {
    let variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = variable_robotvar + '.toggleCamera()\r\n';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };
}
