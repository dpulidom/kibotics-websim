export default function initGetImageOfBlock(){
  var getImageOfBlock = {
    "type": "get_image_of",
    "message0": "%{BKY_GET_IMAGE_OF_TEXT}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OPTIONS",
        "options": [
          [
            "camera0",
            "0"
          ],
          [
            "camera1",
            "1"
          ],
          [
            "camera2",
            "2"
          ]
        ]
      },
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROBOT_CAMERA_HUE}",
    "tooltip": "%{BKY_GET_IMAGE_OF_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['get_image_of'] = {
    init: function() {
      this.jsonInit(getImageOfBlock);

    }
  };

  Blockly.JavaScript['get_image_of'] = function(block) {
    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
    var dropdown_options = block.getFieldValue('OPTIONS');    
    
    var code = variable_robotvar.toString() + '.getImage(' + dropdown_options + ')';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.Python['get_image_of'] = function(block) {
    var variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
    var dropdown_options = block.getFieldValue('OPTIONS');    

    var code = variable_robotvar + '.getImage(' + dropdown_options + ')';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };
}
