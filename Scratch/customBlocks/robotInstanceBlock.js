
export default function initRobotInstanceBlock(){
  var robotInstanceBlock = {
    "type": "robot_instance",
    "message0": "Create robot %1",
    "args0": [
      {
        "type": "field_input",
        "name": "ROBOT_ID",
        "text": "#a-pibot"
      }
    ],
    "output": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "",
    "helpUrl": ""
  };

  Blockly.Blocks['robot_instance'] = {
    init: function() {
      this.jsonInit(robotInstanceBlock);
    }
  };

  Blockly.JavaScript['robot_instance'] = function(block) {
    var text_robot_id = block.getFieldValue('ROBOT_ID');

    var code = 'new RobotI("' + text_robot_id + '")';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  };
}
