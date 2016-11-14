/* 
 * Author: Charlotte Roche
 * Ship class that works better with the other code, but didn't want to change the shipClass with Petes code in it
 */

function ship(type, orientation) {
    this.locations = [];
    this.type = type;
    this.isAlive = true;
    this.orientation = orientation;
    switch (type.toLowerCase()) {
        case 'cruiser':
            this.size = 3;
            break;
        case 'carrier':
            this.size = 5;
            break;
        case 'battleship':
            this.size = 4;
            break;
        case 'submarine':
            this.size = 3;
            break;
        case 'destroyer':
            this.size = 2;
            break;
    }
}

ship.prototype = {
    constructor: ship,
    setLocations: function (locs) {

        this.locations = locs;

    },
    getLocations: function () {
        return this.locations;
    },
    getType: function () {
        return this.type;
    },
    checkIsAlive: function () {
        numofhits = 0;
        for (var i = 0; i < this.getLocations().length; i++) {
            if (this.getLocations()[i][2] == 1) {
                numofhits++;
            }
        }

        console.log(numofhits);

        if (numofhits < this.size) {
            return true;
        } else {
            return false;
        }
    },
    shootShip: function (x, y) {
        for (var i = 0; i < this.getLocations().length; i++) {
            if (this.getLocations()[i][0] == x && this.getLocations()[i][1] == y) {
                this.getLocations()[i][2] = 1;
            }
        }
    },
    buildAIFleet: function (gridSize) {

        //Constants until user can change number of ships

        carrierCount = 1;
        battleshipCount = 1;
        crusierCount = 1;
        submarineCount = 1;
        destroyerCount = 1;

        for (var i = 0; i < carrierCount; i++) {
            placeShip(CARRIER_LEN);
        }
        for (var i = 0; i < battleshipCount; i++) {
            placeShip(BATTLESHIP_LEN);
        }
        for (var i = 0; i < crusierCount; i++) {
            placeShip(CRUISER_LEN);
        }
        for (var i = 0; i < submarineCount; i++) {
            placeShip(SUBMARINE_LEN);
        }
        for (var i = 0; i < destroyerCount; i++) {
            placeShip(DESTROYER_LEN);
        }



    },
    placeShip: function (length) {

    }
};



