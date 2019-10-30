
export default function initConsoleLogBlock(){
  var consoleLogBlock = {
    "type": "logs",
    "message0": "%{BKY_LOGS_TEXT}",
    "args0": [
      {
        "type": "input_value",
        "name": "TO_LOG"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_TOOLS_HUE}",
    "tooltip": "%{BKY_LOGS_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['logs'] = {
    init: function() {
      this.jsonInit(consoleLogBlock);
    }
  };

  Blockly.JavaScript['logs'] = function(block) {
    var value_to_log = Blockly.JavaScript.valueToCode(block, 'TO_LOG', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'console.log(' + value_to_log + ');\n';
    return code;
  };

  Blockly.Python['logs'] = function(block) {
    var value_to_log = Blockly.Python.valueToCode(block, 'TO_LOG', Blockly.Python.ORDER_ATOMIC);

    var code = 'print ' + '(' + value_to_log + ')' + '\r\n';
    return code;
  };
}
