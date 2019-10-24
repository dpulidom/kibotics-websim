import {setupACE, toggleCameraDisplay, getCode, insertCode, reset,changeSpectatorCamera} from './editor-methods.js'

var editor = null

$(document).ready(()=>{
  editor = setupACE();

  $("#cambtn").click(()=>{
    toggleCameraDisplay();
  });

  $("#spectatorCamera").click(()=>{
    changeSpectatorCamera();
  });

  $("#runbtn").click(()=>{
    var pythonCodeString = getCode(editor);
    const request = new Request('http://127.0.0.1:8000/backend/get_python_to_javascript_code', {method: 'POST', body: '{"python_code": "' + pythonCodeString +'"}'});
    fetch(request)
      .then(response => {
        return response.text();
      }).then(function(javascriptCodeString) {
        var websimEvent = new CustomEvent('code-to-run', {
          'detail': {
            'code': javascriptCodeString
          }
        });
        document.dispatchEvent(websimEvent);
      }).catch(error => {
      console.error(error);
    });
  });

  $('#resetRobot').click(()=>{
    var resetEvent = new CustomEvent('reset', {
      'detail': ''
    });
    document.dispatchEvent(resetEvent);
  });
});
