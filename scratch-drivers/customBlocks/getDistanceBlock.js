
export default function initGetDistanceBlock(){
  var getDistanceBlock = {
    "type": "get_distance",
    "message0": "%{BKY_GET_DISTANCE_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROBOT_SENSORS_HUE}",
    "tooltip": "%{BKY_GET_DISTANCE_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['get_distance'] = {
    init: function() {
      this.jsonInit(getDistanceBlock);

    }
  };

  Blockly.JavaScript['get_distance'] = function(block) {
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = variable_robotvar + '.getDistance()';

    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.Python['get_distance'] = function(block) {
    let variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = variable_robotvar + '.leerUltrasonido()\r\n';

    return [code, Blockly.Python.ORDER_NONE];
  };
}
