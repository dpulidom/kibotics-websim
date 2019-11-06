import {arrayIds} from '../globals';

export async function parseObjects(childs, parentItem){
    /**
     * This function parses a JSON file recursively
     * creating all objects of the scene and setting
     * up its attributes
     *
     * @param {object} obj Json parsed object contiaining
     *                     tag, attributes and childs
     *
     * @param {object} parentItem HTML parent tag where new
     *                            elements wil be appended
     *
     * @return {Promise}
     */
    return new Promise(async (resolve, reject)=> {
      for (let i in childs){
        var newChilds;
        if ('childs' in childs[i]){
          newChilds = childs[i]['childs'];
          delete childs[i]['childs'];
        }else{
          newChilds = null;
        }

        // New element, to be the parent if childs attr found
        var element = createElement(childs[i]['tag'], childs[i]);
        element = setAttributes(childs[i]['attr'], element);
        if (newChilds){
          // If childs in current element call recursively function

          parseObjects(newChilds, element);
        }
        parentItem.appendChild(element);
      }
      resolve(parentItem);
    })
}

export function createElement(tag, obj){
  /**
   * Create elements filtering the ones with 'a-robot' tag
   *
   * @param {string} tag Tag used to create element at DOM
   * @param {object} object Contains attributes for the current object.
   *
   * @return {object} Object containing the new tag element to be inserted in DOM.
   */
  var element;
  if (tag == 'a-robot'){
    arrayIds.push(obj['attr']['id']);
    console.log('Robot detected, storing ID');
    element = document.createElement('a-entity');
  }else{
    element = document.createElement(tag);
  }
  return element;
}


export function setAttributes(attr, element){
  /**
   * Sets up attributes for a given element in DOM
   *
   * @param {array} attr Array of attributes to add to current element
   * @param {object} element DOM element where attributes will be inserted
   *
   * @return {object} Input DOM element with configured attributes
   */
  for (var attrKey in attr) {
    let attrVal = attr[attrKey];
    element.setAttribute(attrKey, attrVal);
  }

  return element;
}

export function parseAssets(assets){
  /**
   * This function parses the scene element is exists
   * and sets up its attributes
   *
   * @param {object} sceneJSON JSON object containing scene attributes
   * @param {object} parentEl HTML object where scene element will be appended
   *
   * @return {Promise}
   */
  return new Promise((resolve, reject)=> {
    var scene = document.querySelector('a-scene');
    var assetsWrapper = document.createElement('a-assets');

    for (var pos in assets){
      var tag = assets[pos]['tag'];
      var newElement = document.createElement(tag);

      for (var attr in assets[pos]['attr']){
        newElement.setAttribute(attr, assets[pos]['attr'][attr]);
      }
      assetsWrapper.appendChild(newElement);
      scene.appendChild(assetsWrapper);
    }
    resolve();
  })
}

export function parseScene(sceneJSON, parentEl){
  /**
   * This function parses the scene element is exists
   * and sets up its attributes
   *
   * @param {object} sceneJSON JSON object containing scene attributes
   * @param {object} parentEl HTML object where scene element will be appended
   *
   * @return {Promise}
   */
  return new Promise((resolve, reject) => {
    let scene = document.createElement('a-scene');
    for (let key in sceneJSON){
      scene.setAttribute(key, sceneJSON[key]);
    }
    parentEl.appendChild(scene);
    resolve(scene);
    //scene.systems.physics.driver.world.gravity.y = sceneJSON["gravity"];
  })
}

export function parser(json){
  /**
   * This function splits parse function into parseScene
   * and parseObjects functions
   *
   * @param {object} json JSON object containing scene composition
   *                      and parent element to append the full scene
   */
  return new Promise(async function(resolve, reject){
    let sceneAttrs = json['scene'];
    let sceneAssets = json['assets'];
    let sceneObjects = json['objects'];
    let sceneParentId = json['scene-parent-id'];
    var parentEl = document.getElementById(sceneParentId);
    if (parentEl === null){ console.log("es null"); parentEl = document.body; }
    var scene = await parseScene(sceneAttrs, parentEl);
    scene.systems.physics.driver.world.gravity.y = sceneAttrs["gravity"];
    await parseAssets(sceneAssets);
    await parseObjects(sceneObjects, scene);
    resolve();
  })
}


export async function loadJSON(url) {
  /**
   * This function loads JSON configuration file
   * using AJAX protocol
   *
   * @param {string} url URL where the JSON file is located
   * @param {function} callback Callback function to be executed when
   *                            response returned
   */
  return new Promise(async (resolve, reject) =>{
    var request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', url, false);
    request.send(null);
    if (request.status == 200){
      await parser(JSON.parse(request.responseText));
      resolve();
    }else{
      reject();
    }
  })
}
