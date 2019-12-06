
export default function initSetTimeoutBlock(){
  var setTimeoutBlock = {
    "type": "set_timeout",
    "message0": "%{BKY_SET_TIMEOUT_TEXT}",
    "args0": [
      {
        "type": "field_number",
        "name": "TIME",
        "value": 0,
        "min": 0
      },
      {
        "type": "input_statement",
        "name": "TEXT"
      }
    ],
    "output": null,
    "colour": "%{BKY_ROBOT_TOOLS_HUE}",
    "tooltip": "%{BKY_SET_TIMEOUT_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['set_timeout'] = {
    init: function() {
      this.jsonInit(setTimeoutBlock);
    }
  };

  Blockly.JavaScript['set_timeout'] = function(block) {
    let number_name = block.getFieldValue('TIME');
    let statements_text = Blockly.JavaScript.statementToCode(block, 'TEXT');

    let code = 'setTimeout(()=>{\n' + statements_text + '},' + number_name + ');\n';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.Python['set_timeout'] = function(block) {
    let number_name = parseInt(block.getFieldValue('TIME'));
    let statements_text = Blockly.Python.statementToCode(block, 'TEXT');
    let time_secs = number_name / 1000;
    let code = 'time.sleep(' + time_secs + ')\n' + statements_text + "\r\n";
    return code;
  };
}
