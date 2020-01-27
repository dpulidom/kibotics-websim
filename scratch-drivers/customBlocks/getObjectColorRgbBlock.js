
export default function initGetObjectColorRGB(){
  var getObjectColorRGB = {
    "type": "get_objcolorRGB",
    "message0": "%{BKY_GET_OBJECT_RGB_TEXT}",
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
        "type": "input_value",
        "name": "LOWVALUE",
        "check": "Array"
      },
      {
        "type": "input_value",
        "name": "HIGHVALUE",
        "check": "Array"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": "%{BKY_ROBOT_CAMERA_HUE}",
    "tooltip": "%{BKY_GET_OBJECT_TOOLTIP}",
    "helpUrl": "Entrada: array con valores RGB "
  }

  Blockly.Blocks['get_objcolorRGB'] = {
    init: function() {
      this.jsonInit(getObjectColorRGB);
    }
  };

  Blockly.JavaScript['get_objcolorRGB'] = function(block) {
    let variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    let value_low = Blockly.JavaScript.valueToCode(block, 'LOWVALUE', Blockly.JavaScript.ORDER_ATOMIC);
    let value_high = Blockly.JavaScript.valueToCode(block, 'HIGHVALUE', Blockly.JavaScript.ORDER_ATOMIC);
    let dropdown_options = block.getFieldValue('OPTIONS');

    let code = variable_robotvar + '.getObjectColorPositionRGB("' + dropdown_options + '", "' + value_low + '", "' + value_high + '")';
    return code;
  };

  Blockly.Python['get_objcolorRGB'] = function(block) {
    let variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    let value_low = Blockly.Python.valueToCode(block, 'LOWVALUE', Blockly.Python.ORDER_ATOMIC);
    let value_high = Blockly.Python.valueToCode(block, 'HIGHVALUE', Blockly.Python.ORDER_ATOMIC);


    if(dropdown_options === "X"){
      code = variable_robotvar + '.damePosicionDeObjetoDeColorRGB(' + value_low + ',' + value_high +  ')[0][0];\n';
    }else if(dropdown_options === "Y"){
      code = variable_robotvar + '.damePosicionDeObjetoDeColorRGB(' + value_low + ',' + value_high +  ')[0][1];\n';
    }else{
      code = variable_robotvar + '.damePosicionDeObjetoDeColorRGB(' + value_low + ',' + value_high + ')[1];\n';
    }

    return [code, Blockly.Python.ORDER_NONE];
  };
}
