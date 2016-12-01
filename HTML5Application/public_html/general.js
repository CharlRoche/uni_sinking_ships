/* 
 * This File is intented to contain any global/final variables as well 
 * as any utility functions that may be used repeatedly thoughout the game
 *Author: Peter Henderson
 *Date: 17/10/2016
 *Contribution Log: Name/Date/Description
 *
 *Pete/17/10/2016/Created File, added ship definition Final Variables
 *Pete/27/11/2016/Stopwatch, functions refreshTime, getTimes
 */
var PAUSED_TIME = new Date(0);
var PAUSED = false;

var hitNoise = new Audio('hitNoise.mp3');
var missNoise = new Audio('missNoise.mp3');
var userFleet = [];
var compFleet = [];
var gameWon = false;
//ship variables
var CARRIER_LEN = 5;
var BATTLESHIP_LEN = 4;
var CRUISER_LEN = 3;
var SUBMARINE_LEN = 3;
var DESTROYER_LEN = 2;
function getRandFromArray(array) {

    var rand = array[Math.floor(Math.random() * array.length)];
    return rand;
}

function removeItemFromArray(array, value) {

    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
}
function refreshTime() {
    var startTime = new Date;
    setInterval(getTime, 1000, startTime)
}
function getTime(startTime) {
    if (PAUSED) {
        var pauseStartTemp = new Date;
        while (PAUSED) {
            var currentPauseTime = new Date;
            var timeDiff = new Date(currentPauseTime - pauseStartTemp);
        }
        PAUSED_TIME = PAUSED_TIME + timeDiff;
    } else {
        var currentTime = new Date;
        var timeDiff = new Date(currentTime - startTime - PAUSED_TIME);
        var min = (('00' + timeDiff.getMinutes()).slice(-2));
        var sec = (('00' + timeDiff.getSeconds()).slice(-2));
        $('#clock').text(min + ':' + sec);
    }
}
