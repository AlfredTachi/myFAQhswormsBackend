'use strict';

function randomizeFunction(arr){
    var min = 0;
    
    //Get the maximum value my getting the size of the
    //array and subtracting by 1.
    var max = (arr.length - 1);
    
    //Get a random integer between the min and max value.
    var randomIndex = Math.floor(Math.random() * (max - min)) + min;
    
    return arr[randomIndex];
}

module.exports = randomizeFunction;