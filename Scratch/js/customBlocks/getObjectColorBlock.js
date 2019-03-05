
export default function initGetObjectColorBlock(){
  var getObjectColorBlock = {
    "type": "get_objcolor",
    "message0": "For %1 get %2 for the object with color %3",
    "args0": [
      {
        "type": "field_variable",
        "name": "ROBOTVAR",
        "variable": "myRobot"
      },
      {
        "type": "field_dropdown",
        "name": "OPTIONS",
        "options": [
          [
            "centerX",
            "X"
          ],
          [
            "centerY",
            "Y"
          ],
          [
            "area",
            "AREA"
          ]
        ]
      },
      {
        "type": "field_input",
        "name": "COLOUR",
        "text": "blue"
      }
    ],
    "output": null,
    "colour": "%{BKY_LISTS_HUE}",
    "tooltip": "Get center and area of object with given color",
    "helpUrl": ""
  };

  Blockly.Blocks['get_objcolor'] = {
    init: function() {
      this.jsonInit(getObjectColorBlock);

    }
  };

  Blockly.JavaScript['get_objcolor'] = function(block) {
    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
    var dropdown_options = block.getFieldValue('OPTIONS');
    var text_colour = block.getFieldValue('COLOUR');
    var code = '';

    if(dropdown_options === "X"){
      code = variable_robotvar + '.getObjectColor("' + text_colour +  '").center[0];\n';
    }else if(dropdown_options === "Y"){
      code = variable_robotvar + '.getObjectColor("' + text_colour +  '").center[1];\n';
    }else{
      code = variable_robotvar + '.getObjectColor("' + text_colour +  '").area;\n';
    }

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };

  Blockly.Python['get_objcolor'] = function(block) {
    var variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);
    var dropdown_options = block.getFieldValue('OPTIONS');
    var text_colour = block.getFieldValue('COLOUR');
    var code = '';

    if(dropdown_options === "X"){
      code = variable_robotvar + '.damePosicionDeObjetoDeColor("' + text_colour +  '")[0][0];\n';
    }else if(dropdown_options === "Y"){
      code = variable_robotvar + '.damePosicionDeObjetoDeColor("' + text_colour +  '")[0][1];\n';
    }else{
      code = variable_robotvar + '.damePosicionDeObjetoDeColor("' + text_colour +  '")[1];\n';
    }

    return [code, Blockly.Python.ORDER_NONE];
  };
}
