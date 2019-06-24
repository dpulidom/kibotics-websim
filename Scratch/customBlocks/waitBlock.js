
export default function initWaitBlock(){
  var waitBlock = {
    "type": "wait_block",
    "message0": "%{BKY_WAIT_BLOCK_TEXT}",
    "args0": [
      {
        "type": "field_number",
        "name": "TIME",
        "value": 0.5,
        "min": 0
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
    var value_time_input = block.getFieldValue('TIME');

    var code = 'await sleep(' + value_time_input + ');\n';
    return code;
  };

  Blockly.Python['wait_block'] = function(block) {
    var value_time_input = block.getFieldValue('TIME');

    var code = 'time.sleep(' + value_time_input + ')\r\n';
    return code;
  };
}
