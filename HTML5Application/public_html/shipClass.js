/* 
 * PETE WROTE THIS
 *
 * Assume this code is to be called after position has been selected and validated (post hack)
 * 
 * 
 */

//case to select boat type and constructor inputs -probs to be moved to 'Place Ships' if/when it exists
var shiptype = 'Carrier';
var xyFront = [10, 7];
var xyBack = [10, 3];

switch (shiptype) {
    case 'Carrier':
        carrier = new ship(5, xyFront, xyBack);
        break;
    case 'Battleship':
        battleship = new ship(4, xyFront, xyBack);
        break;
    case 'Cruiser':
        cruiser = new ship(3, xyFront, xyBack);
        break;
    case 'Submarine':
        submarine = new ship(3, xyFront, xyBack);
        break;
    case 'Destroyer':
        destroyer = new ship(2, xyFront, xyBack);
        break;

}

//debug alert(JSON.stringify(carrier, null, 4)); 



function ship(size, xyFront, xyBack) {

    //sixe = int size value passed in from case
    //xyFront = array, [0] = x coord, [1] = y

    this.size = size;
    this.xyFront = xyFront; //don't think this is needed
    this.xyBack = xyBack;   //don't think this is needed
    this.sunk = false;
    this.axis = "null"; //How to decalre a property without a value
    this.x = [];
    this.y = [];
    this.hit = [];


//Set array "x" for x coordinates

    if (xyFront[0] > xyBack[0]) { //set each x coord if ASC
        this.x[0] = xyFront[0];
        for (i = 1; i < this.size; i++) {
            this.x[i] = xyFront[0] - i;
        }
    } else if (xyFront[0] < xyBack[0]) { //set each x coord if DESC
        this.x[0] = xyFront[0];
        for (i = 1; i < this.size; i++) {
            this.x[i] = xyFront[0] + i;
        }
    } else {
        for (i = 0; i < this.size; i++) {//set each x coord if equal
            this.x[i] = xyFront[0];
        }
        this.axis = 'y';
    }

    //Set array "y" for y coordinates
    if (xyFront[1] > xyBack[1]) { //set each x coord if ASC
        this.y[0] = xyFront[1];
        for (i = 1; i < this.size; i++) {
            this.y[i] = xyFront[1] - i;
        }
    } else if (xyFront[1] < xyBack[1]) { //set each x coord if DESC
        this.y[0] = xyFront[1];
        for (i = 1; i < this.size; i++) {
            this.y[i] = xyFront[1] + i;
        }
    } else {
        for (i = 0; i < this.size; i++) {
            this.y[i] = xyFront[1];
        }
        this.axis = 'x';
    }
    //set hit array to false
    for (i = 0; i < this.size; i++) {
        this.hit[i] = false;
    }
   }

ship.prototype = {
    constructor: ship,
    getHit: function (hitAxis) {
        //assumed hit location and ship already validated
        if (this.axis === 'x') {
            this.hit[this.x.indexOf(hitAxis[0])] = true;
        } else {
            this.hit[this.y.indexOf(hitAxis[0])] = true;
        }
        ship.isSunk();
    },
    
    isSunk: function () {
        var sunk = true;
        for (i = 0; i < this.size; i++) {
            if (this.hit[i] === false) {
                sunk = false;
            }
            this.sunk = sunk;
        }
    }

};



