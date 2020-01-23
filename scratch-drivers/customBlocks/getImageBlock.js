
export default function initGetImageBlock(){
  var getImageBlock = {
    "type": "get_image",
    "message0": "%{BKY_GET_IMAGE_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROBOT_CAMERA_HUE}",
    "tooltip": "%{BKY_GET_IMAGE_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['get_image'] = {
    init: function() {
      this.jsonInit(getImageBlock);

    }
  };

  Blockly.JavaScript['get_image'] = function(block) {
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = 'await ' + variable_robotvar.toString() + '.getImage()';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.Python['get_image'] = function(block) {
    let variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = variable_robotvar + '.leerIRSigueLineas()\r\n';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };
}
