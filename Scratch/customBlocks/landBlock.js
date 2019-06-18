
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
    
    //TODO: REVIEW JS CONVERSION
    // Blockly.JavaScript['land'] = function(block) {
    //   var robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
    //   var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  
    //   var code = robotvar + '.setL(' + value + '); \n';
    //   return code;
    // };
  
  
    Blockly.Python['land'] = function(block) {
      var robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);
      //var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  
      var code = robotvar + '.aterrizar(); \r\n' + 'time.sleep(0.5)\r\n';
      return code;
    };
  }
  