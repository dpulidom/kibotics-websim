export function activateMainCamera(){
    /**
     * This function searchs main camera in DOM
     * and sets it as active camera on AFrame scene
     */
    var mainCam = document.getElementById('sceneCam');
    mainCam.setAttribute('camera', 'active', true);
}