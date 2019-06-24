
export default function initPrintOnCanvasBlock(){
  var imgToCanvasBlock = {
    "type": "imgto_canvas",
    "message0": "%{BKY_IMGTO_CANVAS_TEXT}",
    "args0": [
      {
        "type": "field_input",
        "name": "canvas_id",
        "text": "outputCanvas"
      },
      {
        "type": "input_value",
        "name": "img_input"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_TOOLS_HUE}",
    "tooltip": "%{BKY_IMGTO_CANVAS_TOOLTIP}",
    "helpUrl": ""
  };

  Blockly.Blocks['imgto_canvas'] = {
    init: function() {
      this.jsonInit(imgToCanvasBlock);
    }
  };

  Blockly.JavaScript['imgto_canvas'] = function(block) {
    var text_canvas_id = block.getFieldValue('canvas_id');
    var value_img_input = Blockly.JavaScript.valueToCode(block, 'img_input', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'cv.imshow("' + text_canvas_id + '", ' + value_img_input +');\n';
    return code;
  };
}
