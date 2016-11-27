/*
 * Created by Charlotte Roche on 20/10/2016.
 *  *Contribution Log: Name/Date/Description
 *  Peter Henderson/27/10/2016/Added grid, build move list and buildmovelist function
 */


function player(name, xSize, ySize) {
    this.name = name;
    this.moveList = this.buildMoveList(xSize, ySize);
    this.grid = new Grid(xSize, ySize);
    this.hitPlayer = [];
    this.missedPlayer = [];
}

player.prototype = {
    constructor: player,
    getName: function () {
        return this.name;
    },
    makePlayerMove: function (move) {

        var moveCoord = move.substring(2);
        var coord = moveCoord.split(',').map(Number);
        var x = coord[0];
        var y = coord[1];
        AI.grid.fireAtLocation(x, y, true);
        removeItemFromArray(this.moveList, moveCoord); //Player Move list not required???


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
    definePlayerFleetHack: function () {

        PlayerShip1 = new ship('Carrier', 1);
        PlayerShip1.setLocations([[2, 5, 0], [2, 4, 0], [2, 3, 0], [2, 2, 0], [2, 1, 0]]);
        this.grid.addShip(PlayerShip1);

        PlayerShip2 = new ship('Battleship', 1);
        PlayerShip2.setLocations([[6, 3, 0], [7, 3, 0], [8, 3, 0], [9, 3, 0]]);
        this.grid.addShip(PlayerShip2);

        PlayerShip3 = new ship('Cruiser', 1);
        PlayerShip3.setLocations([[7, 5, 0], [7, 6, 0], [7, 7, 0]]);
        this.grid.addShip(PlayerShip3);

        PlayerShip4 = new ship('Submarine', 1);
        PlayerShip4.setLocations([[9, 7, 0], [9, 8, 0], [9, 9, 0]]);
        this.grid.addShip(PlayerShip4);

        PlayerShip5 = new ship('Destroyer', 1);
        PlayerShip5.setLocations([[1, 8, 0], [2, 8, 0]]);
        this.grid.addShip(PlayerShip5);

    },
    drawInitialGrid: function (xLength, yLength) {
        var squareSize = 20;
        var gameBoardContainer = document.getElementById("gameboard");
        // this has been hard coded for the hack, taken form gridCreation
        for (i = 0; i < xLength; i++) {
            for (j = 0; j < yLength; j++) {

                // create a new div HTML element for each grid square and make it the right size
                var square = document.createElement("div");
                gameBoardContainer.appendChild(square);

                // give each div element a unique id based on its row and column, like "s00"
                // The p signifys that it is the id for the players board
                square.id = "p" + String(i) + "," + String(j);
                // set each grid square's coordinates: multiples of the current row or column number
                var topPosition = j * squareSize;
                var leftPosition = i * squareSize;

                // use CSS absolute positioning to place each grid square on the page
                square.style.top = topPosition + 'px';
                square.style.left = leftPosition + 'px';
            }
        }
        player.drawGrid();
    },
    hitShipDraw: function (x, y) {
        var eleID = "ai" + x + "," + y;
        this.hitPlayer.push(eleID);
        document.getElementById(eleID).style.background = "red";
        $("#id").off('click');
    },
    missedShipDraw: function (x, y) {
        var eleID = "ai" + x + "," + y;
        this.missedPlayer.push(eleID);
        document.getElementById(eleID).style.background = "grey";
    },
    drawGrid: function () { //draw the players grid containing their ships

        //place on board Carrier
        document.getElementById("p2,5").style.background = "green";
        document.getElementById("p2,4").style.background = "green";
        document.getElementById("p2,3").style.background = "green";
        document.getElementById("p2,2").style.background = "green";
        document.getElementById("p2,1").style.background = "green";

        //Batteship
        document.getElementById("p6,3").style.background = "green";
        document.getElementById("p7,3").style.background = "green";
        document.getElementById("p8,3").style.background = "green";
        document.getElementById("p9,3").style.background = "green";


        //Cruiser
        document.getElementById("p7,5").style.background = "green";
        document.getElementById("p7,6").style.background = "green";
        document.getElementById("p7,7").style.background = "green";

        //Submarine
        document.getElementById("p9,7").style.background = "green";
        document.getElementById("p9,8").style.background = "green";
        document.getElementById("p9,9").style.background = "green";

        //Destroyer
        document.getElementById("p1,8").style.background = "green";
        document.getElementById("p2,8").style.background = "green";
    }
}

