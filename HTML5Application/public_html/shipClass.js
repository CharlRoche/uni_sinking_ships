/* 
 * Author: Peter Henderson
 * Date: 19/10/2016
 * Contribution Log: Name/Date/Description 
 * 
 * 
 */

//case to select boat type and constructor inputs -probs to be moved to 'Place Ships' if/when it exists


function selectShip(shiptype, user, xyFront, xyBack) {
    switch (shiptype) {
        case 'Carrier':
            carrier = new ship(5, xyFront, xyBack, user);
            break;
        case 'Battleship':
            battleship = new ship(4, xyFront, xyBack, user);
            break;
        case 'Cruiser':
            cruiser = new ship(3, xyFront, xyBack, user);
            break;
        case 'Submarine':
            submarine = new ship(3, xyFront, xyBack, user);
            break;
        case 'Destroyer':
            destroyer = new ship(2, xyFront, xyBack, user);
            break;

    }

}

function ship(size, xyFront, xyBack, user) {

    //sixe = int size value passed in from case
    //xyFront = array, [0] = x coord, [1] = y

    this.size = size;
    this.xyFront = xyFront; //don't think this is needed
    this.xyBack = xyBack;   //don't think this is needed
    this.sunk = false;
    this.axis = -1; //How to decalre a property without a value??
    this.coord = [];
    this.hit = [];

//Set array "x" for x coordinates

    if (xyFront[0] > xyBack[0]) { //set each x coord if ASC
        this.coord[0] = xyFront[0];
        for (i = 1; i < this.size; i++) {
            this.coord[i] = xyFront[0] - i;
        }
    } else if (xyFront[0] < xyBack[0]) { //set each x coord if DESC
        this.coord[0] = xyFront[0];
        for (i = 1; i < this.size; i++) {
            this.coord[i] = xyFront[0] + i;
        }
    } else {
        for (i = 0; i < this.size; i++) {//set each x coord if equal
            this.coord[i] = xyFront[0];
        }
        this.axis = 'y';
    }

    //Set array "y" for y coordinates
    if (xyFront[1] > xyBack[1]) { //set each x coord if ASC
        this.coord[0] = this.coord[0] + '|' + xyFront[1];
        for (i = 1; i < this.size; i++) {
            this.coord[i] = this.coord[i] + '|' + (xyFront[1] - i);
        }
    } else if (xyFront[1] < xyBack[1]) { //set each x coord if DESC
        this.coord[0] = this.coord[0] + '|' + xyFront[1];
        for (i = 1; i < this.size; i++) {
            this.coord[i] = this.coord[i] + '|' + (xyFront[1] + i);
        }
    } else {
        for (i = 0; i < this.size; i++) {
            this.coord[i] = this.coord[i] + '|' + xyFront[1];
        }
        this.axis = 'x';
    }
    //set hit array to false
    for (i = 0; i < this.size; i++) {
        this.hit[i] = false;
    }
    //this.addToFleet(user);
}

ship.prototype = {
    constructor: ship,
    getHit: function (hitCoord) {
        //assumed hit location and ship already validated

        this.hit[this.coord.indexOf(hitCoord)] = true;

        ship.isSunk();
    },
    isSunk: function () {
        var sunk = true;// check if this ship is sunk
        for (i = 0; i < this.size; i++) {
            if (this.hit[i] === false) {
                sunk = false;
            }
            this.sunk = sunk;
        }
    },
    addToFleet: function (user) {

        if (user) {
            userFleet.push(this);
        } else {
            compFleet.push(this);
        }
    }
};



