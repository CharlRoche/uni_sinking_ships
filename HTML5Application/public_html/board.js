/* 
 * Author: Charlotte Roche
 * 20/10/2016
 */

function Board(size) {

    this.size = size;
    this.grid = [];

    //empty coord
    this.init = function() {
        for(var i=0; i<size; i++) {
            this.grid[i] = [];
            for(var j=0; j<size; j++) {
                this.grid[i][j] = 0;
            }
        }
    };

    //if myBoard is true, display ship locations
    this.display = function(myBoard) {
        var grid = "";
        var row = "";
        for(var i=0; i<this.size; i++) {
            for(var j=0; j<this.size; j++) {
                var gridSpot = this.grid[i][j];
                if(typeof gridSpot == 'number') {
                    row += gridSpot;
                } else {
                    var boat = gridSpot;
                    /* It's a boat, let's see if we've already hit it */
                    if(boat.isHitAt([i,j])) {
                        row += HIT_VAL;
                    } else {
                        if(mine) {
                            row += BOAT_VAL;
                        } else {
                            row += EMPTY_VAL;
                        }

                    }
                }
            }
            row += "\n";
            grid += row;
            row = '';
        }

        return grid;
    };

    /* Given a coordinate, check to see if that coordinate contains a boat */
    this.boatCoord = function(coord) {
        if(typeof this.grid[coord[0]][coord[1]] == 'object') {
            return this.grid[coord[0]][coord[1]];
        }

        return false;
    };

    this.markAsMiss = function(coord) {
        this.grid[coord[0]][coord[1]] = 1;
    }

    this.init();
}