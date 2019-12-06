
export default function initGetPositionBlock(){
  var getPositionBlock = {
    "type": "get_position",
    "message0": "%{BKY_GET_POSITION_TEXT}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "POSITION_OPTIONS",
        "options": [
          [
            "x",
            "POSX"
          ],
          [
            "y",
            "POSY"
          ],
          [
            "z",
            "POSZ"
          ],
          [
            "theta",
            "ROTATION"
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
    "colour": "%{BKY_ROBOT_SENSORS_HUE}",
    "tooltip": "%{BKY_GET_POSITION_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['get_position'] = {
    init: function() {
      this.jsonInit(getPositionBlock);

    }
  };

  Blockly.JavaScript['get_position'] = function(block) {
    let dropdown_position_options = block.getFieldValue('POSITION_OPTIONS');
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = variable_robotvar + '.getPosition(' + dropdown_position_options + ');';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
}
