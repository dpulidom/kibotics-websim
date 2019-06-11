
export default function initTakeoffBlock(){
    var takeoffBlock = {
      "type": "takeoff",
      "message0": "%{BKY_TAKEOFF_TEXT}",
      "args0": [
        {
          "type": "field_variable",
          "name": "ROBOT_VAR",
          "variable": "myRobot"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "%{BKY_ROBOT_MOTORS_HUE}",
      "tooltip": "%{BKY_TAKEOFF_TOOLTIP}",
      "helpUrl": ""
    }
  
    Blockly.Blocks['takeoff'] = {
      init: function() {
        this.jsonInit(takeoffBlock);
  
      }
    };
  
    Blockly.JavaScript['takeoff'] = function(block) {
      var robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
      var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  
      var code = robotvar + '.setL(' + value + '); \n';
      return code;
    };
  
  
    Blockly.Python['takeoff'] = function(block) {
      var robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
      //var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  
      var code = robotvar + '.despegar(); \r\n' + 'time.sleep(0.5)\r\n';
      return code;
    };
  }
  