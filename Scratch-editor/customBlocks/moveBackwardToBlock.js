export default function initMoveBackWardToBlock(){
    var moveBackWardToBlock = {
      "type": "move_backward_to",
      "message0": "%{BKY_MOVE_BACKWARD_TO_TEXT}",
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
      "tooltip": "%{BKY_MOVE_BACKWARD_TO_TOOLTIP}",
      "helpUrl": ""
    }
  
    Blockly.Blocks['move_backward_to'] = {
      init: function() {
        this.jsonInit(moveBackWardToBlock);
  
      }
    };
  
    Blockly.JavaScript['move_backward_to'] = function(block) {
      let variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      let value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);

      let code = 'await ' + variable_name + '.retrocederHasta('+value_distance+');';
      return code;
    };
  
    Blockly.Python['move_backward_to'] = function(block) {
      let variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      let value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
  
      let code = variable_name + '.retroceder_a(' + value_distance + ')\r\n';
      return code;
    };
  }