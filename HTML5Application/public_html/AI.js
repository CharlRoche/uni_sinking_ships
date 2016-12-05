/* 
 *Author: Peter Henderson
 *Date: 18/10/2016
 *Contribution Log: Name/Date/Description
 *Peter Henderson 17/11/2016 Added functions buildAIFleet, getRandShipLocation and validateShipLocation to allow random ship placement
 *
 */

function AI(xSize, ySize, difficulty) {
    this.difficulty = difficulty;
    this.ship = [];
    this.mine = [];
    this.moveList = this.buildMoveList(xSize, ySize);
    this.grid = new Grid(xSize, ySize);
    this.buildAIFleet(1, 1, 1, 1, 1, 1);
    this.moveList = this.buildMoveList(xSize, ySize); //restore Movelist as buildAIFleet mangles it
    this.hitAI = [];
    this.missedAI = [];
    this.status = "none"; // is this the correct place to hold this?
    this.hitLastTurn =0; // is this the correct place to hold this?
    this.sunkLastTurn =0; // is this the correct place to hold this?
    this.lastTurn = [0,0]; // this is the co-ords of the AI's last move
    this.lastHitTurn = [0,0]; //place last hit on
    this.missNextGo = false;


}

AI.prototype = {
    constructor: AI,
    makeComputerMoveEasy: function () {
        var move = AI.getRandMove();
        var coord = move.split(',').map(Number);
        var x = coord[0];
        var y = coord[1];
        player.grid.fireAtLocation(x, y, false);
        removeItemFromArray(this.moveList, move);
    },
    makeComputerMoveMed: function () {
    },
    makeComputerMoveHard: function () {
        // Ideal logic for AI:
        // AI's first go is random
        // Each go is random until it hits
        // When it hits, it will try hit an adjacent square
        // When it hits an adjacent square it will try hit the next one along
        // If it misses it will try the opposite end of the row to check other
        // direction
        // Then it will try next one square along that row until sunk ship
        // When sunk it goes back to a random go

        // TO DO:
        // Where hit all squares in ship, except one, it needs to follow ship
        // direction to hit final one until "sunk"
        
        
        if (this.status === "none" ){
            // AI's first move so should be random
            this.status = "gameStarted";
            AI.makeComputerMoveEasy();
        } else if (this.hitLastTurn === 1) {  
            // AI's last go resulted in a hit
            if (this.sunkLastTurn ===1) {
                // AI's last go resulted in sunk ship, should have random move
                AI.makeComputerMoveEasy();
            }
            if (this.status === "hitNextSqaure") {
                AI.hitNextSquare();
            } else if (this.status === "hitOppEndRow") {
                AI.hitOppEndRow();
            } else {
               AI.hitAdjSquare(); 
            }
        } else if (this.status === "hitAdjSquare") {
            AI.hitAdjSquare();
        } else {
            AI.makeComputerMoveEasy();
        }
    },

    hitNextSquare: function () { 
        console.log("AI in the hitNextSquare function");
       // list of adjacent squares to last move
       // clear status
        this.status = "gameStarted";
        var move = this.lastHitTurn;
        var x = move[0];
        var y = move[1];

        var adjSquares = [[x+1, y] // one below
                            , [x-1, y] // one above
                            , [x, y-1] // one to left
                            , [x, y+1]]; // one to the right

        // loop through each array in ajsSquares
        for(var i = 0; i < adjSquares.length; i++) {
            var temp = adjSquares[i];
            var coord1 = temp[0] + "," + temp[1];
            if (this.moveList.includes(coord1)) {
                var alreadyHitX = temp[0];
                var alreadyHitY = temp[1];
                }
        } 
        if (alreadyHitX > x) {
            //  it's row below, same y val
            // fire at (x+1, y);
            player.grid.fireAtLocation(alreadyHitX, alreadyHitY, false);
            var remove = alreadyHitX + ',' + alreadyHitY;
            removeItemFromArray(this.moveList, remove);
            if (this.hitLastTurn === 0) {
                this.status = "hitOppEndRow";
            } else {
                this.status = "hitNextSqaure";
            }
            
                    
        } else if (alreadyHitX < x) {
            //  it's row above above, same y val
            // fire at (x-1, y);
            player.grid.fireAtLocation(alreadyHitX, alreadyHitY, false);
            var remove = alreadyHitX + ',' + alreadyHitY;
            removeItemFromArray(this.moveList, remove);
            if (this.hitLastTurn === 0) {
                this.status = "hitOppEndRow";
            } else {
                this.status = "hitNextSqaure";
            }
                   
        } else if (alreadyHitX === x) { 
            //  same row
            if (alreadyHitY > y) {
                //      it's to the right
                // fire at (x, y+1);
                player.grid.fireAtLocation(alreadyHitX, alreadyHitY, false);
                var remove = alreadyHitX + ',' + alreadyHitY;
                removeItemFromArray(this.moveList, remove);
                if (this.hitLastTurn === 0) {
                this.status = "hitOppEndRow";
                } else {
                this.status = "hitNextSqaure";
                }
            } else if (alreadyHitY < y) {
                //      it's to the left
                // fire at (x, y-1);
                player.grid.fireAtLocation(alreadyHitX, alreadyHitY, false);
                var remove = alreadyHitX + ',' + alreadyHitY;
                removeItemFromArray(this.moveList, remove);
                if (this.hitLastTurn === 0) {
                this.status = "hitOppEndRow";
                } else {
                this.status = "hitNextSqaure";
                }
            }
        } else {
            AI.hitAdjSquare();
        }  
                
    },
   
    hitOppEndRow: function() {
        console.log("AI in the hitOppEndRow function");
        // clear status
        this.status = "gameStarted";
        // this function is to hit opposite side of row where there has been a miss
        var move = this.lastHitTurn;
        var x = move[0];
        var y = move[1];
        // hit next square along. need a variable to hold last square hit
        // check if left of it been hit already
        var eleID = "p" + String(x) + "," + String(y-1);
        var colour = (document.getElementById(eleID).style.background).trim();
        if (colour === "red") {
            // it's been hit
            // fire at x, y+1
            var coord1 = x + "," + y+1;
            if (this.moveList.includes(coord1)) {
                player.grid.fireAtLocation(x, y+1, false);
                var remove = x + ',' + y+1;
                removeItemFromArray(this.moveList, remove);
                this.status = "brainStepTwo";
            }
        } 
        var eleID = "p" + String(x) + "," + String(y+1);
        var colour = (document.getElementById(eleID).style.background).trim();
        if (colour === "red") {
                //it's been hit
                // fire at x, y-1
            var coord1 = x + "," + y-1;
            if (this.moveList.includes(coord1)) {
                player.grid.fireAtLocation(x, y-1, false);
                var remove = x + ',' + y-1;
                removeItemFromArray(this.moveList, remove);
                this.status = "brainStepTwo";
            }
        }
        // check if above it has been hit already
        var eleID = "p" + String(x-1) + "," + String(y);
        var colour = (document.getElementById(eleID).style.background).trim();
        if (colour === "red") { 
            //it's been hit
            // fire at x+1, y
            var coord1 = x+1 + "," + y;
            if (this.moveList.includes(coord1)) {
                player.grid.fireAtLocation(x+1, y, false); 
                var remove = x+1 + ',' + y;
                removeItemFromArray(this.moveList, remove);
                this.status = "brainStepTwo";
            }
        }
       // check if below it has been hit already
        var eleID = "p" + String(x+1) + "," + String(y);
        var colour = (document.getElementById(eleID).style.background).trim();
        if (colour === "red") {
            //it's been hit
            // fire at x-1, y
            var coord1 = x-1 + "," +y;
            if (this.moveList.includes(coord1)) {
                player.grid.fireAtLocation(x-1, y, false);
                var remove = x-1 + ',' + y;
                removeItemFromArray(this.moveList, remove);
                this.status = "brainStepTwo";
            }
        }
        if (colour == null) {
            this.status = "brainStepTwo";
            AI.brainStepTwo();
        }
        return status;
    },
    hitAdjSquare: function () { 
        console.log("AI in the hitAdjSquare function");
        // clear status
        this.status = "gameStarted";
        // this function is try hit squares around one which has been hit
        var move = this.lastHitTurn;
        var x = move[0];
        var y = move[1];

        var adjSquares = [[x+1, y] // one below
                            , [x-1, y] // one above
                            , [x, y-1] // one to left
                            , [x, y+1]]; // one to the right

            // loop through each array in ajsSquares
        var thing = 0;
        for(var i = 0; i < adjSquares.length; i++) {
            var temp = adjSquares[i];
            var coord1 = temp[0] + "," + temp[1];
            if (this.moveList.includes(coord1)) {
                //
                var alreadyHitX = temp[0];
                var alreadyHitY = temp[1];
                player.grid.fireAtLocation(alreadyHitX, alreadyHitY, false);
                var remove = alreadyHitX + ',' + alreadyHitY;
                removeItemFromArray(this.moveList, remove);
                if (this.hitLastTurn===1) {
                    this.status = "hitNextSquare";
                } else {
                    this.status = "hitAdjSquare";
                }
                //this.status = "Nothing";
                //return status;
                thing = 1;
                break;
            }
        }
        if (thing===0){
            AI.makeComputerMoveEasy();
        }
            
           
    },

    getRandMove: function () {
        var rand = getRandFromArray(this.moveList);
        return rand;
    },
    think: function () {
        var thought = setInterval(function () {
            AI.think1(thought);
        }, 200);
    },
    think1: function (thought) {
        AIthoughts++;
        if (AIthoughts > 10) {
            AIthoughts = 0;
            clearInterval(thought);
        } else {
            var rand = this.getRandMove();
            var square = "p" + rand;
            AI.think2(square);
        }
    },
    think2: function (square) {
        var prevColor = document.getElementById(square).style.background;
        document.getElementById(square).style.background = 'blue';
        setTimeout(function () {
            AI.think3(square, prevColor);
        }, 200);
    },
    think3: function (square, prevColor) {

        document.getElementById(square).style.background = prevColor;

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
    drawInitialGrid: function (xLength, yLength) {
        var squareSize = 35;
        var gameBoardContainer = document.getElementById("aigameboard");
        // this has been hard coded for the hack, taken form gridCreation
        // below draws initial grid
        for (i = 0; i < xLength; i++) {
            for (j = 0; j < yLength; j++) {

                // create a new div HTML element for each grid square and make it the right size
                var square = document.createElement("div");
                gameBoardContainer.appendChild(square);
                // give each div element a unique id based on its row and column, like "s00"

                // The ai signifys that it is the id for the players board
                square.id = "ai" + String(i) + "," + String(j);
                // set each grid square's coordinates: multiples of the current row or column number
                var topPosition = j * squareSize;
                var leftPosition = i * squareSize;
                // use CSS absolute positioning to place each grid square on the page
                square.style.top = topPosition + 'px';
                square.style.left = leftPosition + 'px';
            }
        }
        //set click event for player move
        $('#aigameboard').children().one('click', function () {
            startPlayerMove(this.id);
        });
    },
    hitShipDraw: function (x, y) {
        var eleID = "p" + x + "," + y;
        this.hitAI.push(eleID);
        document.getElementById(eleID).style.background = "red";
        this.lastHitTurn = [x,y];
        this.lastTurn = [x,y];
        this.hitLastTurn = 1;
        //verify holding correct co-ords
        console.log("status: " + this.status);
        console.log("lastTurn: " + this.lastTurn);
        console.log("lastHitTurn: " + this.lastHitTurn);
        console.log("hitLastTurn flag: "+ this.hitLastTurn);
        console.log("sunkLastTurn flag: "+ this.sunkLastTurn);
        console.log("end of go");

    },
    missedShipDraw: function (x, y) {
        var eleID = "p" + x + "," + y;
        this.missedAI.push(eleID);
        document.getElementById(eleID).style.background = "grey";
        this.lastTurn = [x,y];
        this.hitLastTurn = 0;
        //verify holding correct co-ords
        console.log("status: " + this.status);
        console.log("lastTurn: " + this.lastTurn);
        console.log("lastHitTurn: " + this.lastHitTurn);
        console.log("hitLastTurn flag: "+ this.hitLastTurn);
        console.log("sunkLastTurn flag: "+ this.sunkLastTurn);
        console.log("end of go");
    },
    buildAIFleet: function (carrierCount, battleshipCount, crusierCount, submarineCount, destroyerCount, noOfMines) {
        //Randomly Build AI Fleet
        var shipCount = 0; //index for this.ship array
        var mineCount = 0; //index for this.mine array

        //for each ship type
        for (var i = 0; i < carrierCount; i++) {
            var location = this.getRandShipLocation(5, false); //get positions
            this.ship[shipCount] = new ship('Carrier', 1); //create ship
            this.ship[shipCount].setLocations(location); //add locations
            this.grid.addShip(this.ship[shipCount]); //add ship to grid
            shipCount++;
        }
        for (var i = 0; i < battleshipCount; i++) {
            var location = this.getRandShipLocation(4, false);
            this.ship[shipCount] = new ship('Battleship', 1);
            this.ship[shipCount].setLocations(location);
            this.grid.addShip(this.ship[shipCount]);
            shipCount++;
        }
        for (var i = 0; i < crusierCount; i++) {
            var location = this.getRandShipLocation(3, false);
            this.ship[shipCount] = new ship('Cruiser', 1);
            this.ship[shipCount].setLocations(location);
            this.grid.addShip(this.ship[shipCount]);
            shipCount++;
        }
        for (var i = 0; i < submarineCount; i++) {
            var location = this.getRandShipLocation(3, false);
            this.ship[shipCount] = new ship('Submarine', 1);
            this.ship[shipCount].setLocations(location);
            this.grid.addShip(this.ship[shipCount]);
            shipCount++;
        }
        for (var i = 0; i < destroyerCount; i++) {
            var location = this.getRandShipLocation(2, false);
            this.ship[shipCount] = new ship('Destroyer', 1);
            this.ship[shipCount].setLocations(location);
            this.grid.addShip(this.ship[shipCount]);
            shipCount++;
        }
        for (var i = 0; i < noOfMines; i++) {
            var location = this.getRandShipLocation(1, true); //get positions
            this.mine[mineCount] = new mine(); //create mine
            this.mine[mineCount].setLocations(location); //add location
            this.grid.addMine(this.mine[mineCount]); //add mine to grid
            mineCount++;

        }
    },
    getRandShipLocation: function (length, isMine) {

        invalidLocation = true;
        while (invalidLocation === true) {//repeat finding a random position until a valid location is found

            var target = getRandFromArray(this.moveList); // get random start position
            var coord = target.split(',').map(Number); //split to x and y
            var x = coord[0];
            var y = coord[1];
            var locat = [];
//build location array of each grid
            if (!isMine) {
                var direction = getRandFromArray(['n', 's', 'e', 'w']); //select a random direction
                switch (direction) {
                    case 'n':
                        for (var i = 0; i < length; i++) {
                            locat.push([x, (y + i)]);
                        }
                        break;
                    case 's':

                        for (var i = 0; i < length; i++) {
                            locat.push([x, (y - i)]);
                        }
                        break;
                    case 'e':
                        for (var i = 0; i < length; i++) {
                            locat.push([(x + i), y]);
                        }
                        break;
                    case 'w':
                        for (var i = 0; i < length; i++) {
                            locat.push([(x - i), y]);
                        }
                        break;
                }
            } else {

                locat.push([x, y]);

            }

            invalidLocation = this.validateShipLocation(locat);
        }

        for (i = 0; i < locat.length; i++) {
            //remove each seleted location from move list so it cannot be selected again
            var remove = locat[i][0] + ',' + locat[i][1];
            removeItemFromArray(this.moveList, remove);
        }
        return locat;
    },
    validateShipLocation: function (locat) {

        invalid = false;
        for (var i = 0; i < locat.length; i++) {
            var coord = locat[i][0] + ',' + locat[i][1];
            if (!this.moveList.includes(coord)) { //location is only valid if it exists in the movelist
                invalid = true;
            }
        }
        return invalid;
    }
};
