
export default function initSetIntervalBlock(){
  var setIntervalBlock = {
    "type": "set_interval",
    "message0": "Bucle infinito %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "TEXT"
      }
    ],
    "output": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "Bucle infinto",
    "helpUrl": ""
  };

  Blockly.Blocks['set_interval'] = {
    init: function() {
      this.jsonInit(setIntervalBlock);
    }
  };

  Blockly.JavaScript['set_interval'] = function(block) {
    var statements_text = Blockly.JavaScript.statementToCode(block, 'TEXT');

    var code = 'setInterval(()=>{\n' + statements_text + '},100);\n';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.Python['set_interval'] = function(block) {
    var statements_text = Blockly.Python.statementToCode(block, 'TEXT');

    var code = 'while True:\n' + statements_text + '\ntime.sleep(0.1)\n';
    return [code, Blockly.Python.ORDER_ATOMIC];
  };
}
