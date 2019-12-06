
export default function initStopBlock(){
  var stopBlock = {
    "type": "stop_robot",
    "message0": "%{BKY_STOP_ROBOT_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "NAME",
        "variable": "myRobot"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_MOTORS_HUE}",
    "tooltip": "%{BKY_STOP_ROBOT_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['stop_robot'] = {
    init: function() {
      this.jsonInit(stopBlock);
    }
  };

  Blockly.JavaScript['stop_robot'] = function(block) {
    let variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

    let code = variable_name + '.move(0, 0, 0);\n';
    return code;
  };


  Blockly.Python['stop_robot'] = function(block) {
    let variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);

    let code = variable_name + '.parar()\r\n';
    return code;
  };
}
