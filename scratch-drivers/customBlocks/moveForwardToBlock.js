
export default function initMoveForwardToBlock(){
    var moveForwardToBlock = {
      "type": "move_forward_to",
      "message0": "%{BKY_MOVE_FORWARD_TO_TEXT}",
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
      "tooltip": "%{BKY_MOVE_FORWARD_TO_TOOLTIP}",
      "helpUrl": ""
    }
  
    Blockly.Blocks['move_forward_to'] = {
      init: function() {
        this.jsonInit(moveForwardToBlock);
  
      }
    };
  
    Blockly.JavaScript['move_forward_to'] = function(block) {
      let variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      let value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
      let code = 'await ' + variable_name + '.advanceTo('+value_distance+');\n';
      return code;
    };
  
    Blockly.Python['move_forward_to'] = function(block) {
      let variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      let value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
  
      let code = variable_name + '.avanzar_a(' + value_distance + ')\r\n';
      return code;
    };
  }
  