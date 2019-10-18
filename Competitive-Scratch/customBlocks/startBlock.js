
export default function initStartBlock(){
    var startBlock = {
      "type": "start",
      "message0": "%{BKY_START_TEXT}",
      "nextStatement": null,
      "colour": "%{BKY_ROBOT_START_HUE}",
      "tooltip": "%{BKY_START_TOOLTIP}",
      "helpUrl": ""
    }
  
    Blockly.Blocks['start'] = {
      init: function() {
        Blockly.BlockSvg.START_HAT = true; 
        this.jsonInit(startBlock);
  
      }
    };
  
    Blockly.JavaScript['start'] = function(block) {
      return "\n";
    };
  
  
    Blockly.Python['start'] = function(block) {
        return "\n";
    };
  }
  