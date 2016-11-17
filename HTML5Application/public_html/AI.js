/* 
 * 
 *Author: Peter Henderson
 *Date: 18/10/2016
 *Contribution Log: Name/Date/Description
 *Peter Henderson 17/11/2016 Added functions buildAIFleet, getRandShipLocation and validateShipLocation to allow random ship placement
 *
 */

function AI(xSize, ySize) {
    this.difficulty = 'easy';
    this.ship = [];
    this.moveList = this.buildMoveList(xSize, ySize);
    this.grid = new Grid(xSize, ySize);
    this.buildAIFleet(1, 1, 1, 1, 1);
    this.moveList = this.buildMoveList(xSize, ySize); //restore Movelist as buildAIFleet mangles it
    this.hitAI = [];
    this.missedAI = [];


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
    },
    /* defineCompFleetHack: function () {
     
     AIShip1 = new ship('Carrier', 1);
     AIShip1.setLocations([[2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0]]);
     this.grid.addShip(AIShip1);
     
     
     AIShip2 = new ship('Battleship', 1);
     AIShip2.setLocations([[6, 5, 0], [7, 5, 0], [8, 5, 0], [9, 5, 0]]);
     this.grid.addShip(AIShip2);
     
     AIShip3 = new ship('Cruiser', 1);
     AIShip3.setLocations([[4, 2, 0], [4, 3, 0], [4, 4, 0]]);
     this.grid.addShip(AIShip3);
     
     AIShip4 = new ship('Submarine', 1);
     AIShip4.setLocations([[9, 7, 0], [9, 8, 0], [9, 9, 0]]);
     this.grid.addShip(AIShip4);
     
     AIShip5 = new ship('Destroyer', 1);
     AIShip5.setLocations([[6, 9, 0], [7, 9, 0]]);
     this.grid.addShip(AIShip5);
     
     },*/
    getRandMove: function () {
        var rand = getRandFromArray(this.moveList);
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
    drawInitialGrid: function () {
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
                square.id = "ai" + String(i) + "," + String(j);
                square.onclick = function () {
                    startPlayerMove(this.id);
                };

                // set each grid square's coordinates: multiples of the current row or column number
                var topPosition = j * squareSize;
                var leftPosition = i * squareSize;

                // use CSS absolute positioning to place each grid square on the page
                square.style.top = topPosition + 'px';
                square.style.left = leftPosition + 'px';
            }
        }

    },
    hitShipDraw: function (x, y) {
        var eleID = "p" + x + "," + y;
        this.hitAI.push(eleID);
        document.getElementById(eleID).style.background = "red";
    },
    missedShipDraw: function (x, y) {
        var eleID = "p" + x + "," + y;
        this.missedAI.push(eleID);
        document.getElementById(eleID).style.background = "grey";
    },
    buildAIFleet: function (carrierCount, battleshipCount, crusierCount, submarineCount, destroyerCount) { 
        //Randomly Build AI Fleet
        var shipCount = 0; //index for this.ship array
        //for each ship type
        for (var i = 0; i < carrierCount; i++) {
            var location = this.getRandShipLocation(5); //get positions
            this.ship[shipCount] = new ship('Carrier', 1);//create ship
            this.ship[shipCount].setLocations(location);//add locations
            this.grid.addShip(this.ship[shipCount]);//add ship to grid
            shipCount++;
        }
        for (var i = 0; i < battleshipCount; i++) {
            var location = this.getRandShipLocation(4);
            this.ship[shipCount] = new ship('Battleship', 1);
            this.ship[shipCount].setLocations(location);
            this.grid.addShip(this.ship[shipCount]);
            shipCount++;
        }
        for (var i = 0; i < crusierCount; i++) {
            var location = this.getRandShipLocation(3);
            this.ship[shipCount] = new ship('Cruiser', 1);
            this.ship[shipCount].setLocations(location);
            this.grid.addShip(this.ship[shipCount]);
            shipCount++;
        }
        for (var i = 0; i < submarineCount; i++) {
            var location = this.getRandShipLocation(3);
            this.ship[shipCount] = new ship('Submarine', 1);
            this.ship[shipCount].setLocations(location);
            this.grid.addShip(this.ship[shipCount]);
            shipCount++;
        }
        for (var i = 0; i < destroyerCount; i++) {
            var location = this.getRandShipLocation(2);
            this.ship[shipCount] = new ship('Destroyer', 1);
            this.ship[shipCount].setLocations(location);
            this.grid.addShip(this.ship[shipCount]);
            shipCount++;
        }
    },
    getRandShipLocation: function (length) {


        invalidLocation = true;
        while (invalidLocation === true) {//repeat finding a random position until a valid location is found

            var target = getRandFromArray(this.moveList); // get random start position
            var coord = target.split(',').map(Number); //split to x and y
            var x = coord[0];
            var y = coord[0];
            var direction = getRandFromArray(['n', 's', 'e', 'w']); //select a random direction
            var locat = [];

//build location array of each grid
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
            invalidLocation = this.validateShipLocation(locat);
        }
        
        for (i = 0; i < locat.length; i++) {
            //remove each seleted location from move list so it cannot be selected again
            var remove = locat[i][0] + ',' + locat[i][1];
            removeItemFromArray(this.moveList, remove);
           
        }
        //DEBUG
        for (i=0;i<locat.length;i++){
            console.log(locat[i][0]+','+locat[i][1]);
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

    },
    drawGrid: function () { //draw the AI's grid containing their ships (hidden)


        /*
         // creates general array of al possible moves
         // hardcoded to grid size ten, will need to amend for MVP
         var allShots = [];
         for (i = 0; i < 10; i++) {
         for (j = 0; j < 10; j++) {
         allShots.push(i + ',' + j);
         }
         }
         
         
         // shots_taken is the shots they have taken:
         // it is the difference between allShots and AI.movelist
         //var shotsTakenAI = allShots.filter(x > player.moveList.indexOf(x) < 0);
         //var shotsTakenPlayer = diffArray(allShots, AI.moveList);
         
         var seen = [];
         var shotsTakePlayer = [];
         for ( var i = 0; i < AI.moveList.length; i++)
         seen[AI.moveList[i]] = true;
         for ( var i = 0; i < allShots.length; i++)
         if (!seen[allShots[i]])
         shotsTakePlayer.push(allShots[i]);
         
         
         
         
         // for shots_taken, find the intersection with the AI ships.
         // any intersections will indicate the player has hit the AI
         // therefore for intersection set doc element background colour to red
         
         //var hitShipsPlayer = intersection(shotsTakenPlayer, allShots);
         
         var m1 = (shotsTakePlayer).reduce(function(m1, v) { m1[v] = 1; return m1; }, {});
         var hitShipsPlayer = (allShots).filter(function(v) { return m1[v]; });
         
         // need to loop through hit_ships array to split it out and put into
         // CSS ID format
         var numLoops = hitShipsPlayer.length;
         for(i=0; i<numLoops; i++) {
         // get item in array
         var getArray = hitShipsPlayer[i];
         // get row
         var row = getArray[0];
         var col = getArray[2];
         var str2 = "p";
         var str3 = ",";
         var hitCoords1 = str2+row+str3+col;
         document.getElementById(hitCoords1).style.background="red";
         }
         
         // then calculate the difference between shots_taken and hit_shits and colour the 
         // difference as grey which indicates shots taken which didn't hit a ship
         
         //var missedShipsPlayer = shotsTakenPlayer.filter(x => hitShipsPlayer.indexOf(x) < 0 );
         var m2 = (shotsTakePlayer).reduce(function(m2, v) { m2[v] = 1; return m2; }, {});
         var missedShipsPlayer = (hitShipsPlayer).filter(function(v) { return m1[v]; });
         
         
         var numLoops = missedShipsPlayer.length;
         for(i=0; i<numLoops; i++) {
         // get item in array
         var getArray = missedShipsPlayer[i];
         // get row
         var row = getArray[0];
         var col = getArray[2];
         var str2 = "p";
         var str3 = ",";
         var missedCoords1 = str2+row+str3+col;
         document.getElementById(missedCoords1).style.background="grey";
         }
         
         
         
         
         
         
         */}
};
