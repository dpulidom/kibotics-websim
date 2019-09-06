export function sleep(s) {
  /**
   * Auxiliar function to implement a throttle of code.
   * 
   * @param {integer} s Number of seconds to stop the code
   */
    var ms = s*1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}


  /*
  https://gist.github.com/AndersDJohnson/4385908
  */
export var setIntervalSynchronous = function (func, delay) {
  /**
   * This function sets interval synchronous
   * 
   * @param {function} func Function to be executed when reached interval time
   * @param {integer} delay Time to wait between executions
   */
    var intervalFunction, timeoutId, clear, stopped=false;
    // Call to clear the interval.
    clear = function () {
      stopped = true;
      clearTimeout(timeoutId);
    };
    intervalFunction = async function () {
      await func();
      if (!stopped){
        timeoutId = setTimeout(intervalFunction, delay);
      }
      
    }
    // Delay start.
    timeoutId = setTimeout(intervalFunction, delay);
    // You should capture the returned function for clearing.
    return clear;
  };