
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
    var dropdown_position_options = block.getFieldValue('POSITION_OPTIONS');
    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
    var code = '';

    if(dropdown_position_options === "POSX"){
      code = variable_robotvar + '.getPosition().x';
    }else if(dropdown_position_options === "POSY"){
      code = variable_robotvar + '.getPosition().z';
    }else if(dropdown_position_options === "POSZ"){
      code = variable_robotvar + '.getPosition().y';
    }else{
      code = variable_robotvar + '.getPosition().theta';
    }
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
}
