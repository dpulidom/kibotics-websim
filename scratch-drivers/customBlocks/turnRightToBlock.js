
export default function initTurnRightToBlock(){
    var turnRightToBlock = {
      "type": "turn_right_to",
      "message0": "%{BKY_TURN_RIGHT_TO_TEXT}",
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
      "tooltip": "%{BKY_TURN_RIGHT_TO_TOOLTIP}",
      "helpUrl": ""
    }
  
    Blockly.Blocks['turn_right_to'] = {
      init: function() {
        this.jsonInit(turnRightToBlock);
  
      }
    };
  
    Blockly.JavaScript['turn_right_to'] = function(block) {
        let variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
        let value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
        let code = 'await ' + variable_name + '.girarDerechaHasta(' + value_distance + ');\n';

        return code;
    };
  
    Blockly.Python['turn_right_to'] = function(block) {
        let variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
        let value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

        let code = variable_name + '.girar_derecha_a(' + value_distance + ')\r\n';
        return code;
    };
  }
  