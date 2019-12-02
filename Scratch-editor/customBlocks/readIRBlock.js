
export default function initReadIRBlock(){
  var readIRBlock = {
    "type": "read_ir",
    "message0": "%{BKY_READ_IR_TEXT}",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOT_VAR",
        "variable": "myRobot"
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "white"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROBOT_SENSORS_HUE}",
    "tooltip": "%{BKY_READ_IR_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['read_ir'] = {
    init: function() {
      this.jsonInit(readIRBlock);
    }
  };

  Blockly.JavaScript['read_ir'] = function(block) {
    let variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
    let value_name = '"'+block.getFieldValue('NAME') +'"';

    let code = variable_robot_var + '.readIR(' + value_name + ')';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.Python['read_ir'] = function(block) {
    let variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
    let value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);

    let code = variable_robot_var + '.leerIRSigueLineas()\r\n';

    return [code, Blockly.Python.ORDER_ATOMIC];
  };
}
