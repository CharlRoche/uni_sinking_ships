/* 
 * Author: Charlotte Roche
 * 21/10/2016
 */

function Player() {
    this.name = "Default";
    this.board = new Board(BOARD_SIZE);
    this.ships = [];

    /* Function that takes a set of coordinates as an argument and returns a string with a status message */
    this.takeShotAt = function(coord) {
        var status  = "";
        var ship = this.board.boatCoord(coord);
        if(ship) {
            ship.takeHit(coord);
            if(boat.isSunk()) {
                status = "You sunk the boat!";
            } else {
                status = "Hit!";
            }
        } else {
            this.board.markAsMiss(coord);
            status = "Miss!";
        }

        return status;
    }

    //if myBaord is true, display the other players ships
    this.printBoard = function(myBoard) {
        return this.board.display(myBoard);
    }

    // Checks if other player has boats remaining
    this.isStillAlive = function() {
        for(var i=0; i<this.ships.length; i++) {
            if(typeof this.ships[i] == "object" && !this.boats[i].isSunk()) {
                return true;
            }
        }
        return false;
    }

}

