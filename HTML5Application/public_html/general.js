/* 
 * This File is intented to contain any global/final variables as well 
 * as any utility functions that may be used repeatedly thoughout the game
 *Author: Peter Henderson
 *Date: 17/10/2016
 *Contribution Log: Name/Date/Description
 *
 *Pete/17/10/2015/Created File, added ship definition Final Variables
 *
 * 
 */

var userScore = 0;
var compScore = 0;
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





//DEPRECATED

function isInFleet(user, target) {

    var ship;
    if (user) {
        for (i = 0; i < userFleet.length; i++) {
            for (j = 0; j < userFleet[i].coord.length; j++) {
                if (target === userFleet[i].coord[j]) {
                    ship = userFleet[i];
                    break;
                }
            }
            if (typeof ship !== 'undefined') {
                break;
            }
        }
    } else if (user === false) {
        for (i = 0; i < compFleet.length; i++) {
            for (j = 0; j < compFleet[i].coord.length; j++) {
                if (target === compFleet[i].coord[j]) {
                    ship = compFleet[i];
                    break;
                }
            }
            if (typeof ship !== 'undefined') {
                break;
            }
        }
    } else {
        ship = -1;
    }
    return ship;
}
