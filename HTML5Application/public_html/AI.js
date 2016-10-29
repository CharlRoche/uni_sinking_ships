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
        AIShip1.setLocations([[2, 8, 0], [2, 9, 0], [2, 10, 0], [2, 11, 0], [2, 12, 0]]);
        this.grid.addShip(AIShip1);


        AIShip2 = new ship('Battleship', 1);
        AIShip2.setLocations([[11, 3, 0], [12, 3, 0], [13, 3, 0], [14, 3, 0]]);
        this.grid.addShip(AIShip2);

        AIShip3 = new ship('Cruiser', 1);
        AIShip3.setLocations([[7, 2, 0], [7, 3, 0], [7, 4, 0]]);
        this.grid.addShip(AIShip3);

        AIShip4 = new ship('Submarine', 1);
        AIShip4.setLocations([[13, 9, 0], [13, 10, 0], [13, 11, 0]]);
        this.grid.addShip(AIShip4);

        AIShip5 = new ship('Destroyer', 1);
        AIShip5.setLocations([[6, 13, 0], [7, 13, 0]]);
        this.grid.addShip(AIShip5);

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
        var squareSize = 50;
        var gameBoardContainer = document.getElementById("aigameboard");
        // this has been hard coded for the hack, taken form gridCreation
        // below draws initial grid
        for (i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {

                // create a new div HTML element for each grid square and make it the right size
                var square = document.createElement("div");
                gameBoardContainer.appendChild(square);

                // give each div element a unique id based on its row and column, like "s00"
                //square.id = Number(String(i) + String(j)) ;	
                // The p signifys that it is the id for the players board
                square.id = "ai" + String(i) + String(j);

                // set each grid square's coordinates: multiples of the current row or column number
                var topPosition = j * squareSize;
                var leftPosition = i * squareSize;

                // use CSS absolute positioning to place each grid square on the page
                square.style.top = topPosition + 'px';
                square.style.left = leftPosition + 'px';
            }
        }

        // need to plot in grey on the AI screen where the player has shot at. 
        // Shots they have taken is the difference between full array and Player.movelist
        // TO DO: allShots needs to be a standard set placed elsewhere for MVP for better efficency

        var allShots = []
        for (i = 0; i < 10; i++) {
            for (j = 0; j < 10; j++) {
                allShots.push(i + ',' + j);
            }
        }


        // shots_taken is the shots they have taken:
        // it is the difference between allShots and player.movelist
        var shots_taken = allShots.filter(x > player.moveList.indexOf(x) < 0);


        // for shots_taken, find the intersection with the AI ships.
        // any intersections will indicate the player has hit the AI
        // therefore for intersection set doc element background colour to red

        //var hit_ships = // workout intersection here...

        // need to loop through hit_ships array to split it out and put into
        // CSS ID format
        //for (i=0; i<diff; i++) {
        // split out arrays to form ai + x + y to feed into below
        //document.getElementById("ai34").style.background="grey";
        //}

        // then calculate the difference between shots_taken and hit_shits and colour the 
        // difference as grey which indicates shots taken which didn't hit a ship

        // var missed_ships = shots_taken.filter(x => hit_ships.indexOf(x) < 0 );

        // need to loop through missed_ships array to split it out and put into
        // CSS ID format
        //for (i=0; i<diff; i++) {
        // split out arrays to form ai + x + y to feed into below
        //document.getElementById("ai34").style.background="grey";
        //}

        //just realised my OO is crappy and have put in get functions, dont think js specifically needs them however


    }
};