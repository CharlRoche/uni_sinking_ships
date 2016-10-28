/* 
 * 
 *Author: Peter Henderson
 *Date: 18/10/2016
 *Contribution Log: Name/Date/Description
 *
 */

function AI(xSize, ySize) {
    this.difficulty = 'easy';
    this.moveList = this.buildMoveList(xSize, ySize);
    this.grid = new Grid(xSize, ySize);


}

AI.prototype = {
    constructor: AI,
    makeComputerMoveEasy: function () {
        var move = getRandMove();
        var moveCoord = move.split(',').map(Number);
        player.grid.fireAtLocation(moveCoord)
        this.moveList = removeItemFromArray(this.moveList, moveCoord);

    },
    makeComputerMoveMed: function () {
    },
    makeComputerMoveHard: function () {
    },
    defineCompFleetHack: function () {//not complete

        AIShip1 = new ship('Carrier', 1);
        AIShip1.setLocations = ([[2, 8, 0], [2, 9, 0], [2, 10, 0], [2, 11, 0], [2, 12, 0]]);
        this.grid.addShip(AIShip1);

/*    THIS all needs to match above code block
        var shiptype = 'Battleship';
        var xyFront = ([[11, 3, 0], [12, 3, 0], [13, 3, 0], [14, 3, 0]]);

        var shiptype = 'Cruiser';
        var xyFront = ([[7, 2, 0], [7, 3, 0], [7, 4, 0]]);

        var shiptype = 'Submarine';
        var xyFront = ([[13, 9, 0], [13, 10, 0], [13, 11, 0]]);

        var shiptype = 'Destroyer';
        var xyFront = ([[6, 13, 0], [7, 13, 0]]);
        */

    },
    getRandMove: function () {

        var rand = this.moveList[Math.floor(Math.random() * this.moveList.length)];
        return rand;
    },
    buildMoveList: function (xSize, ySize) {
        var moveList = [];
        for (i = 0; i < ySize; i++) {
            for (j = 0; j < xSize; j++) {
                moveList.push(i + ',' + j);
            }
        }
        return moveList;
    },
    drawGrid: function () { //draw the AI's grid containing their ships (hidden)



       this.grid; //this contains locations of all of the AI ships (and if they have been hit)
       Player.movelist; //This contains everymove the AI is yet to make.
       
       
       //just realised my OO is crappy and have put in get functions, dont think js specifically needs them however
       
       
    }
};