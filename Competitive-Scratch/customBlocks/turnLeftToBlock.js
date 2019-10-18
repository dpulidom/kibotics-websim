
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
      var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
      //var value_rads = value_distance * 3.14/180;
      //var value_rads = value_distance /425; //el simulador no va en rad/s (Pibot)
      var value_rads = value_distance /620; //el simulador no va en rad/s (Drone)
      var vel = 0.02; // 5 degrees aprox
      var t = value_rads/vel;
      var code = variable_name + '.setW('+vel+'); \nawait sleep('+t+');\n'+variable_name + '.setW(0); \n';
      return code;
    };
  
    Blockly.Python['turn_left_to'] = function(block) {
      var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
      var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
  
      var code = variable_name + '.girar_izquierda_a(' + value_distance + ')\r\n';
      return code;
    };
  }
  