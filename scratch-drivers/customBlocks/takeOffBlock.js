
export default function initTakeOffBlock(){
    var takeOffBlock = {
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
        this.jsonInit(takeOffBlock);
  
      }
    };
  
    Blockly.JavaScript['takeoff'] = function(block) {
        var robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
  
        let code = 'await ' + robotvar + '.despegar();\n';
        return code;
    };
  
  
    Blockly.Python['takeoff'] = function(block) {
        let robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);

        let code = robotvar + '.despegar(); \r\n' + 'time.sleep(0.5)\r\n';
        return code;
    };
  }
  