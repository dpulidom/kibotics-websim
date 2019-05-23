
export default function initWaitBlock(){
  var waitBlock = {
    "type": "wait_block",
    "message0": "%{BKY_WAIT_BLOCK_TEXT}",
    "args0": [
      {
        "type": "input_value",
        "name": "time_input"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_TOOLS_HUE}",
    "tooltip": "%{BKY_WAIT_BLOCK_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['wait_block'] = {
    init: function() {
      this.jsonInit(waitBlock);

    }
  };

  Blockly.JavaScript['wait_block'] = function(block) {
    var value_time_input = Blockly.JavaScript.valueToCode(block, 'time_input', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'await sleep(' + value_time_input + ');\n';
    return code;
  };

  Blockly.Python['wait_block'] = function(block) {
    var value_time_input = Blockly.Python.valueToCode(block, 'time_input', Blockly.Python.ORDER_ATOMIC);

    var code = 'time.sleep(' + value_time_input/1000 + ')\r\n';
    return code;
  };
}
