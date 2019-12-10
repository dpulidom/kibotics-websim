
export default function intiLandBlock(){
    var landBlock = {
      "type": "land",
      "message0": "%{BKY_LAND_TEXT}",
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
      "tooltip": "%{BKY_SET_LAND_TOOLTIP}",
      "helpUrl": ""
    }
  
    Blockly.Blocks['land'] = {
      init: function() {
        this.jsonInit(landBlock);
  
      }
    };
    

     Blockly.JavaScript['land'] = function(block) {
        let robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);

        let code = 'await ' + robotvar + '.land();\n';
        return code;
    };
  
  
    Blockly.Python['land'] = function(block) {
        let robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);

        let code = robotvar + '.aterrizar(); \r\n' + 'time.sleep(0.5)\r\n';
        return code;
    };
  }
  