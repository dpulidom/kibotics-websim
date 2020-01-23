export default function initGetDistancesBlock(){
  var getDistancesBlock = {
    "type": "get_distances",
    "message0": "%{BKY_GET_DISTANCES_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROBOT_SENSORS_HUE}",
    "tooltip": "%{BKY_GET_DISTANCES_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['get_distances'] = {
    init: function() {
      this.jsonInit(getDistancesBlock);

    }
  };

  Blockly.JavaScript['get_distances'] = function(block) {
    let variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);

    let code = 'await ' + variable_robotvar + '.getDistances()';

    return [code, Blockly.JavaScript.ORDER_NONE];
  };
}
