
export default function initSetIntervalBlock(){
  var setIntervalBlock = {
    "type": "set_interval",
    "message0": "%{BKY_SET_INTERVAL_TEXT}",
    "args0": [
      {
        "type": "input_statement",
        "name": "TEXT"
      }
    ],
    "previousStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "%{BKY_SET_INTERVAL_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['set_interval'] = {
    init: function() {
      this.jsonInit(setIntervalBlock);
    }
  };

  Blockly.JavaScript['set_interval'] = function(block) {
    let statements_text = Blockly.JavaScript.statementToCode(block, 'TEXT');

    let code = 'while(true) {\n' + statements_text + '\n}';
    return code;
  };

  Blockly.Python['set_interval'] = function(block) {
    let statements_text = Blockly.Python.statementToCode(block, 'TEXT');

    let code = 'while True:\n' + statements_text + '\ntime.sleep(0.1)\n';
    return code;
  };
}
