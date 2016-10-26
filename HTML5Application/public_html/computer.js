/* 
 * 
 *Author: Peter Henderson
 *Date: 18/10/2016
 *Contribution Log: Name/Date/Description
 *
 */

function makeComputerMove(computerGrid) {

    var moveCoord = getRandFromArray(computerGrid);
    var ship = isInFleet(true, moveCoord);
    if (ship === -1) {
        console.log('No Hit');
    } else {
        console.log('HIT');
        ship.getHit(moveCoord);
    }
    computerGrid = removeItemFromArray(computerGrid, moveCoord);
}

function defineCompFleetHack() {

    var shiptype = 'Carrier';
    var xyFront = [2, 8];
    var xyBack = [2, 12];
    selectShip(shiptype, true, xyFront, xyBack);
    var shiptype = 'Battleship';
    var xyFront = [11, 3];
    var xyBack = [14, 3];
    selectShip(shiptype, true, xyFront, xyBack);
    var shiptype = 'Cruiser';
    var xyFront = [7, 2];
    var xyBack = [7, 4];
    selectShip(shiptype, true, xyFront, xyBack);
    var shiptype = 'Submarine';
    var xyFront = [13, 9];
    var xyBack = [13, 11];
    selectShip(shiptype, true, xyFront, xyBack);
    var shiptype = 'Destroyer';
    var xyFront = [6, 13];
    var xyBack = [7, 13];
    selectShip(shiptype, true, xyFront, xyBack);
    
}

