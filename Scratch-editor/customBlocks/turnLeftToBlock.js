
export default function initTurnLeftToBlock(){
    var turnLeftToBlock = {
      "type": "turn_left_to",
      "message0": "%{BKY_TURN_LEFT_TO_TEXT}",
      "args0": [
        {
          "type": "field_variable",
          "name": "NAME",
          "variable": "myRobot"
        },
        {
          "type": "input_value",
          "name": "DISTANCE",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "%{BKY_ROBOT_MOTORS_HUE}",
      "tooltip": "%{BKY_TURN_LEFT_TO_TOOLTIP}",
      "helpUrl": ""
    }
  
    Blockly.Blocks['turn_left_to'] = {
      init: function() {
        this.jsonInit(turnLeftToBlock);
  
      }
    };
  
    Blockly.JavaScript['turn_left_to'] = function(block) {
      let variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      let value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

      let code = 'await ' + variable_name + '.girarIzquierdaHasta(' + value_distance + ');\n';
      return code;
    };
  
    Blockly.Python['turn_left_to'] = function(block) {
      let variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      let value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
  
      let code = variable_name + '.girar_izquierda_a(' + value_distance + ')\r\n';
      return code;
    };
  }
  