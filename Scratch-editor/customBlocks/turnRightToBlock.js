
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
        var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
        var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
        //var value_rads = value_distance * 3.14/180;
        var value_rads = value_distance /425; //el simulador no va en rad/s
        var vel = 1; // 5 degrees aprox
        var t = value_rads/vel;
        var code = variable_name + '.setW(-'+vel+'); \nawait sleep('+t+');\n'+variable_name + '.setW(0); \n';
        return code;
    };
  
    Blockly.Python['turn_right_to'] = function(block) {
      var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
  
      var code = variable_name + '.girar_derecha_a(' + value_distance + ')\r\n';
      return code;
    };
  }
  