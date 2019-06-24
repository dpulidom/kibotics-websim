// Auxiliar function to implement a throttle of code.
function sleep(s) {
    ms = s*1000;
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  /*
  https://gist.github.com/AndersDJohnson/4385908
  */
  var setIntervalSynchronous = function (func, delay) {
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